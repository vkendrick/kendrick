# Templates WhatsApp — Prospecção

Variáveis (trocar antes de enviar):
- `{negocio}` → nome do negócio (ex: Clínica Dental Sonrisa)
- `{cidade}` → cidade (ex: Madrid)
- `{categoria}` → categoria em minúsculo/plural natural (ex: dentistas, barberías, pastelerías)
- `{ejemplo}` → link do exemplo mais parecido:
  - Saúde/beleza/clínicas → `https://kendrick-z4b.pages.dev/ejemplos/clinica-dental-sonrisa/`
  - Bares/barbearias/serviços masculinos → `https://kendrick-z4b.pages.dev/ejemplos/barberia-corte-fino/`

Regras:
- Enviar em horário comercial Espanha: **10h–13h e 16h–19h**
- Máximo **20 envios/dia** no manual (evita bloqueio)
- Uma conversa por vez — sem mensagem em massa
- Sempre anexar o **print da proposta** na msg 1

---

## Msg 1 — Primeiro contato (+ print da proposta)

> Hola, soy Veridiana de Kendrick. Vi que {negocio} no aparece en Google cuando buscan {categoria} en {cidade} — sus competidores sí aparecen.
>
> Mira lo que hicimos para un negocio parecido 👇
> {ejemplo}
>
> ¿Le interesa algo así para {negocio}? Le explico en 5 min por aquí.

## Msg 2 — Follow-up 48h (sem resposta)

> Hola de nuevo 👋 Solo para no perder el hilo: la muestra que preparé para {negocio} sigue disponible. ¿Quiere que se la envíe?

## Msg 3 — Com interesse (enviar proposta + preço)

> Perfecto 🙌 La idea es simple: web sencilla + Google Maps verificado + botón de WhatsApp, listo en 4 semanas desde €450.
>
> ¿Agendamos una llamada de 15 min esta semana? Mi número: +34 658 598 442

---

## Sequência (tracking na planilha)

| Dia | Ação | Status na planilha |
|-----|------|--------------------|
| D0 | Enviar msg 1 + print | Novo → Enviado |
| D+2 | Sem resposta → msg 2 | Enviado (atualizar data) |
| Respondeu | Conversar → msg 3 se houver interesse | Respondeu |
| Aceitou call | Agendar 15 min | Call agendada |
| Pós-call | Enviar resumo + preço | Proposta enviada |
| Fechou / sumiu | — | Fechou / Descartado |
