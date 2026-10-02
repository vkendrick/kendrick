# Guia — Prospecção MVP (GMB → WhatsApp → Proposta → Tracking)

Tempo estimado: 30 min de setup. Depois: ~20 leads/dia no manual.

## 1. Planilha de tracking (Google Sheets)

1. Crie uma planilha nova → **Arquivo > Importar** → suba `leads-modelo.csv` (separador: vírgula) → apague as 3 linhas de exemplo
2. Coluna **Status**: selecione a coluna toda → **Dados > Validação de dados** → lista:
   `Novo,Enviado,Respondeu,Call agendada,Proposta enviada,Fechou,Descartado`
3. Cores por status: selecione a coluna Status → **Formatar > Formatação condicional** → "O texto contém":
   - Novo → cinza | Enviado → amarelo | Respondeu → azul
   - Call agendada → roxo | Proposta enviada → laranja
   - Fechou → verde | Descartado → vermelho claro

## 2. Buscar leads (Apify, grátis 1k/mês)

1. apify.com → Actor **Google Maps Scraper**
2. Busca: `{categoria} en {cidade}` (ex: `dentista en Madrid`)
3. Exporte CSV → filtre `website vazio` → cole na planilha (colunas Negócio/Cidade/Categoria/Telefone/Reviews/Rating)

## 3. Mensagem WhatsApp

Use `templates-whatsapp.md`. Troque `{negocio}`, `{cidade}`, `{categoria}`.
Ordem: msg 1 + print → D+2 sem resposta: msg 2 → com interesse: msg 3.

## 4. Proposta visual (print)

1. Abra `proposta-modelo.html` no Chrome com os dados na URL:
   `proposta-modelo.html?nome=Clínica Dental Sonrisa&cidade=Madrid&categoria=dentista&tel=34600111222`
2. Clique **"Esconder barra e gerar link limpo ✓"**
3. Print de página inteira: `F12` → `Ctrl+Shift+P` → **"Capture full size screenshot"**
4. Anexe o print na msg 1 do WhatsApp

## 5. Rotina diária (validação)

- 20 leads/dia · horário Espanha 10h–13h / 16h–19h
- Atualize Status + Data a cada envio/resposta
- Meta de validação: **10 calls agendadas** → aí automatizamos (n8n + envio)
