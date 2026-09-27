# Kendrick Consultoria Digital - Portfolio & Lead Gen Site

Sitio web de servicios de consultoría digital para pequeños negocios. Construido con React + TypeScript + Vite, desplegado en Cloudflare Pages con Functions (API) y D1 Database.

## Stack

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS v4
- **Routing**: React Router v7
- **UI**: Lucide React + Sonner (toasts) + Framer Motion
- **API**: Cloudflare Pages Functions (Hono-like handlers)
- **Database**: Cloudflare D1 (SQLite)
- **Email**: Resend (transaccional)
- **WhatsApp**: CallMeBot API (notificaciones)
- **Deploy**: Cloudflare Pages (Git integration)

## Estructura

```
├── src/
│   ├── pages/
│   │   ├── Home.tsx          # Landing page principal (hero, portfolio carousel, paquetes, FAQ, contacto)
│   │   ├── Quiz.tsx          # Diagnóstico 5 preguntas → captura email → resultado personalizado
│   │   ├── Casos.tsx         # 7 casos de éxito expandibles con métricas antes/después
│   │   ├── Privacidad.tsx
│   │   └── Terminos.tsx
│   ├── components/
│   │   ├── PortfolioCarousel.tsx  # Carrusel con 7 screenshots reales de proyectos
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── CookieBanner.tsx
│   ├── worker/
│   │   └── index.ts          # API Hono (alternativa a Pages Functions)
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── functions/
│   └── api/
│       ├── leads.ts          # POST /api/leads (quiz)
│       └── contact.ts        # POST /api/contact (formulario)
├── migrations/
│   └── 001_init.sql          # Schema D1
├── public/
│   ├── portfolio/            # 7 screenshots reales (fisiovida, barbearia, linguaflow, reyes, dulceluna, alma-serena, autofix)
│   ├── images/
│   └── _redirects            # SPA fallback
├── wrangler.jsonc
├── package.json
└── .github/workflows/deploy.yml
```

## Flujo de conversión

1. **Hero** → Hook específico: "5-10 clientes nuevos/mes para negocios invisibles en Google"
2. **Social proof bar** → 4.9/5 · 47 reseñas · +€50k facturación extra · 7 casos
3. **Dual CTA** → "Diagnóstico gratis (3 min)" + "Ver casos reales"
4. **Problema** → 3 tarjetas de dolor
4. **Portfolio Carousel** → 7 proyectos reales con screenshots + métricas
5. **Servicios (escalera)** → 3 niveles acumulativos (01 → 02 → 03)
6. **Proceso** → 4 pasos visuales
7. **Testimonio** → Ana Torres (FisioVida)
8. **FAQ** → 5 objeciones principales
9. **CTA Final** → Diagnóstico gratis
10. **Contacto** → Formulario + WhatsApp directo

## Desarrollo local

```bash
# Instalar dependencias
npm install --legacy-peer-deps

# Dev server (Vite + Hono worker en :5173)
npm run dev

# Build producción
npm run build

# Preview build local
npm run preview

# Test Cloudflare Pages local (requiere wrangler login)
npm run pages:dev
```

## Despliegue en Cloudflare Pages

### Opción A: Git Integration (Recomendado)

1. Push a GitHub/GitLab
2. En Cloudflare Dashboard → Pages → Connect to Git
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variables:
   - `RESEND_API_KEY` (para emails)
   - `OWNER_EMAIL` (veridiana@kendrick.com)
   - `CALLMEBOT_APIKEY` (opcional, para WhatsApp)
6. Create D1 database `kendrick-leads` y vincular en Pages Settings → Functions → D1
7. Create KV namespace `LEADS_KV` y vincular
8. Run migration: `wrangler d1 execute kendrick-leads --file=./migrations/001_init.sql --remote`

### Opción B: Wrangler CLI

```bash
# Login
wrangler login

# Create D1 database
wrangler d1 create kendrick-leads

# Update wrangler.jsonc with database_id
# Run migration
wrangler d1 execute kendrick-leads --file=./migrations/001_init.sql --remote

# Create KV namespace
wrangler kv:namespace create LEADS_KV
# Update wrangler.jsonc with id

# Deploy
npm run pages:deploy
```

## Variables de entorno requeridas

| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| `RESEND_API_KEY` | API key de Resend para emails transaccionales | Sí (prod) |
| `OWNER_EMAIL` | Email donde llegan notificaciones | Sí |
| `CALLMEBOT_APIKEY` | API key de CallMeBot para WhatsApp | No |
| `DB` | Binding D1 (configurado en Pages) | Sí |
| `LEADS_KV` | Binding KV (configurado en Pages) | No |

## API Endpoints

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/leads` | POST | Recibe datos del quiz, guarda en D1, envía email al lead + notifica owner |
| `/api/contact` | POST | Recibe formulario de contacto, guarda en D1, notifica por WhatsApp + email |
| `/api/health` | GET | Health check (en worker) |

## Casos de éxito incluidos (7)

| Cliente | Sector | Nivel | Métrica principal |
|---------|--------|-------|-------------------|
| FisioVida Madrid | Fisioterapia | 01 | +6 pacientes/mes, Top 3 Google |
| Barbería Don Mateo | Barbería | 01 | 23 reservas online/mes |
| LinguaFlow | Academia idiomas | 02 | +€1.200/mes, sistema automatizado |
| Reyes Arquitectura | Arquitectura | 02 | 3× más presupuestos |
| Pastelería Dulce Luna | Pastelería | 01 | +40% ventas online |
| Yoga Alma Serena | Bienestar | 03 | Clases 97% ocupación |
| Taller AutoFix | Mecánico | 01 | 5-6 clientes nuevos/mes |

## Próximos pasos sugeridos

1. **Optimizar imágenes**: Convertir portfolio a WebP/AVIF con `sharp` (<100KB cada una)
2. **Analytics**: Añadir Cloudflare Web Analytics o Plausible
3. **SEO**: Sitemap.xml, robots.meta, JSON-LD schema para LocalBusiness
4. **A/B Testing**: Probar hero alternativo, CTA colors, quiz length
5. **Lead nurturing**: Secuencia email 5-7 días post-quiz (ya hay templates en `kendrick/templates/emails/`)
6. **Calendly integration**: Reemplazar URLs placeholder con enlaces reales

## Licencia

Privado - Kendrick Consultoria Digital