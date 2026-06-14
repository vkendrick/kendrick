# Guía de Deploy — Kendrick Consultoria Digital
## Cloudflare Pages + Workers + D1

> Tiempo estimado: 30-45 minutos la primera vez.
> Requisitos: Cuenta en Cloudflare (gratuita) y Node.js instalado.

---

## Paso 0: Preparación

### Instalar Wrangler (CLI de Cloudflare)
```bash
npm install -g wrangler
```

### Iniciar sesión en Cloudflare
```bash
wrangler login
```
Se abrirá el navegador. Autoriza el acceso.

---

## Paso 1: Crear la Base de Datos D1

```bash
# Crear la base de datos
wrangler d1 create kendrick-db

# Guarda el output — necesitarás el database_id
# Ejemplo de output:
# ✅ Successfully created DB 'kendrick-db'
# database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

### Actualizar wrangler.toml con el database_id real

Abre `wrangler.toml` y reemplaza `YOUR_D1_DATABASE_ID` con el ID que obtuviste:

```toml
[[d1_databases]]
binding = "DB"
database_name = "kendrick-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"  # ← Tu ID aquí
```

### Aplicar el schema SQL

```bash
# En producción
wrangler d1 execute kendrick-db --file=./schema.sql

# Para verificar que las tablas se crearon
wrangler d1 execute kendrick-db --command="SELECT name FROM sqlite_master WHERE type='table';"
```

---

## Paso 2: Configurar las Variables de Entorno (Secrets)

```bash
# API key de Resend (para emails)
# Regístrate gratis en https://resend.com — plan gratuito: 3.000 emails/mes
wrangler secret put RESEND_API_KEY
# Pega tu API key cuando te lo pida

# Email del dueño (para notificaciones de nuevos leads)
wrangler secret put OWNER_EMAIL
# Escribe: veridiana@kendrick.com

# Nombre de la agencia
wrangler secret put APP_NAME
# Escribe: Kendrick Consultoria Digital
```

---

## Paso 3: Deploy del Worker (Backend)

```bash
# Build del worker
wrangler deploy src/worker/index.ts --name kendrick-worker

# El output te dará la URL del worker:
# https://kendrick-worker.TU-SUBDOMINIO.workers.dev
```

---

## Paso 4: Deploy del Frontend (Cloudflare Pages)

### Opción A: Deploy directo desde la carpeta (más rápido)

```bash
# Build del frontend
pnpm build

# Deploy a Cloudflare Pages
wrangler pages deploy dist --project-name kendrick-consultoria
```

### Opción B: Deploy automático desde GitHub (recomendado para producción)

1. Sube el proyecto a GitHub:
```bash
git init
git add .
git commit -m "Initial commit — Kendrick Consultoria Digital"
git remote add origin https://github.com/TU-USUARIO/kendrick-consultoria.git
git push -u origin main
```

2. En el dashboard de Cloudflare:
   - Ve a **Pages** → **Create a project** → **Connect to Git**
   - Selecciona tu repositorio
   - Configuración de build:
     - **Framework preset:** Vite
     - **Build command:** `pnpm build`
     - **Build output directory:** `dist`
   - Haz clic en **Save and Deploy**

---

## Paso 5: Conectar el Worker con Pages

En el dashboard de Cloudflare Pages:
1. Ve a tu proyecto → **Settings** → **Functions**
2. En **KV namespace bindings** o **D1 database bindings**, añade:
   - Variable name: `DB`
   - D1 database: `kendrick-db`

### Configurar el proxy del Worker en Pages

Crea el archivo `public/_routes.json` para que las rutas `/api/*` vayan al Worker:

```json
{
  "version": 1,
  "include": ["/*"],
  "exclude": ["/api/*"]
}
```

Y crea `functions/api/[[route]].ts` para el proxy:

```typescript
export const onRequest = async (context: any) => {
  const worker = await import("../../src/worker/index");
  return worker.default.fetch(context.request, context.env, context.ctx);
};
```

---

## Paso 6: Dominio Personalizado

En el dashboard de Cloudflare Pages:
1. Ve a tu proyecto → **Custom domains**
2. Haz clic en **Set up a custom domain**
3. Escribe tu dominio: `kendrick.com` (o el que tengas)
4. Sigue las instrucciones para configurar los DNS

Si tu dominio está en Cloudflare Registrar, se configura automáticamente.
Si está en otro registrador, añade estos registros DNS:
- Tipo: `CNAME`
- Nombre: `@` (o `www`)
- Valor: `kendrick-consultoria.pages.dev`

---

## Paso 7: Configurar Resend para Emails

1. Regístrate en [resend.com](https://resend.com) (gratuito)
2. Ve a **Domains** → **Add Domain** → Añade `kendrick.com`
3. Configura los registros DNS que te indique Resend (SPF, DKIM, DMARC)
4. Copia tu API key y ejecútala como secret (ya lo hiciste en el Paso 2)

> ⚠️ Sin Resend configurado, los emails no se enviarán pero el sitio funcionará igualmente. Los leads se guardan en D1 aunque el email falle.

---

## Paso 8: Configurar las URLs de Calendly

En `src/pages/Quiz.tsx`, reemplaza las 3 URLs de Calendly con tus links reales:

```typescript
// Nivel 1 — Arranque Digital Mínimo
calendlyUrl: "https://calendly.com/TU-USUARIO/arranque-digital",

// Nivel 2 — Estructura de Ventas Integrada
calendlyUrl: "https://calendly.com/TU-USUARIO/estructura-ventas",

// Nivel 3 — Mentoría de Crecimiento Avanzado
calendlyUrl: "https://calendly.com/TU-USUARIO/mentoria-crecimiento",
```

Crea los 3 tipos de evento en [calendly.com](https://calendly.com):
- Duración: 30 minutos
- Nombre: "Sesión de diagnóstico gratuita — [Nombre del paquete]"

---

## Verificación Final

Después del deploy, verifica:

- [ ] La página de inicio carga correctamente
- [ ] El quiz funciona de principio a fin
- [ ] Al completar el quiz, el lead se guarda en D1
- [ ] Recibes el email de notificación en veridiana@kendrick.com
- [ ] El lead recibe el email con su resultado
- [ ] Los botones de Calendly abren la página correcta
- [ ] El banner de cookies aparece en la primera visita
- [ ] Las páginas /privacidad y /terminos cargan correctamente

```bash
# Verificar que los leads se guardan en D1
wrangler d1 execute kendrick-db --command="SELECT * FROM leads ORDER BY created_at DESC LIMIT 5;"
```

---

## Costes en Cloudflare (Plan Gratuito)

| Servicio | Límite gratuito | Suficiente para |
|---|---|---|
| Pages | Requests ilimitados | Siempre |
| Workers | 100.000 requests/día | ~3.000 visitas/día |
| D1 | 5 GB almacenamiento | Miles de leads |
| Resend | 3.000 emails/mes | Hasta ~100 leads/mes |

**Coste total mensual: €0** hasta que tengas tráfico significativo.

---

## Soporte

Si tienes problemas durante el deploy, escribe a veridiana@kendrick.com con:
1. El mensaje de error exacto
2. En qué paso estás
3. Tu sistema operativo

---

*Guía preparada por Kendrick Consultoria Digital*
*Última actualización: Junio 2026*
