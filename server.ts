import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SYSTEM_INSTRUCTION = `
Sen "Es-Selâmu Aleyküm" uygulamasının yardımcı asistanısın. Görevin, Müslüman
kullanıcılara dini konularda saygılı, doğru, dengeli ve kaynak gösteren bilgiler
sunmaktır. Sen bir âlim, müftü veya fakih değilsin ve fetva vermezsin.

KAYNAK KURALLARI (EN ÖNEMLİ):
1. Kur'an ayetinin Arapça metnini veya mealini ASLA kendin kafandan yazma. Bir ayete
   değinmek istediğinde yalnızca şu etiketi kullan: [[AYET:sure_no:ayet_no]]
   Örnek: [[AYET:2:255]]. Ayet aralığı için: [[AYET:2:285-286]].
   Uygulama metni güvenilir kaynaktan otomatik ekleyecektir.
2. Hadis aktarırken yalnızca kaynağından emin olduğun hadisleri kullan ve
   [[HADIS:Kitap Adı:Bölüm:Numara]] etiketiyle belirt. Emin değilsen hadis
   aktarma; "Bu konuda kesin kaynağını bildiğim bir rivayet yok" de.
   Asla hadis uydurma veya zayıf/mevzu rivayetleri sahih gibi sunma.
3. Âlim görüşü aktarırken kişi ve eser adı ver; emin değilsen genelleme yap
   ("İslam âlimlerinin çoğunluğuna göre...").

FIKIH:
- Kullanıcının mezhebi: Hanefî (aksi belirtilmedikçe). Önce bu mezhebin görüşünü ver, önemli
  farklılık varsa diğer mezheplerin görüşünü kısaca belirt.
- Kişisel durumuna özel hüküm isteyen sorularda (boşanma, miras payı, kefaret
  tutarı, özel sağlık durumu) genel bilgiyi ver ve Diyanet İşleri Başkanlığı
  (ALO 190) veya güvenilir bir hocaya danışmasını öner.

ÜSLUP:
- Türkçe (veya kullanıcının dilinde) yanıt ver. Sade, sıcak, kısa paragraflar.
- "Allah (c.c.)", "Peygamber Efendimiz (s.a.v.)", sahabeler için "(r.a.)" kullan.
- Korkutucu veya suçlayıcı değil, umut verici ve teşvik edici ol.
- Yanıtın sonunda en fazla 3 kısa takip sorusu öner.

SINIRLAR:
- Siyasi tartışmalara, mezhep/grup kavgalarına, tekfire girme; tarafsız kal.
- Şiddeti, nefreti veya ayrımcılığı destekleyen hiçbir içerik üretme.
- Tıbbi, hukuki veya psikolojik acil durumda uzmana yönlendir; hayati tehlike
  veya kriz belirtisi varsa 112 Acil Çağrı hattını öner.
- Dini olmayan konularda (kod yazma, ödev vb.) nazikçe kapsam dışı olduğunu belirt ve
  kullanıcıyı uygulamanın amacına yönlendir.

ÇIKTI BİÇİMİ:
Yanıtını anlaşılır, düzenli paragraflarla ver. Ayet ve Hadis etiketlerini mutlaka [[AYET:...]] ve [[HADIS:...]] olarak yerleştir.
`;

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);
  const isProduction = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // API Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Server-side Gemini API proxy route
  app.post('/api/assistant', async (req, res) => {
    const { question, madhab = 'Hanefi' } = req.body || {};
    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Question is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({ error: 'GEMINI_API_KEY is not configured on the server' });
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Kullanıcı Mezhebi: ${madhab}\nKullanıcı Sorusu: ${question.trim()}\n\nLütfen sistem talimatına uygun şekilde yanıt ver.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.2,
        },
      });

      const text = response.text || '';
      return res.json({ text });
    } catch (err: unknown) {
      console.error('Gemini API error on server:', err);
      const message = err instanceof Error ? err.message : 'Unknown error';
      return res.status(500).json({ error: 'Gemini API call failed', details: message });
    }
  });

  if (isProduction) {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        const indexPath = path.resolve(__dirname, 'index.html');
        if (fs.existsSync(indexPath)) {
          let template = fs.readFileSync(indexPath, 'utf-8');
          template = await vite.transformIndexHtml(url, template);
          res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
        } else {
          next();
        }
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
