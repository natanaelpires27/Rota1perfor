# Rota 1%

Aplicacao web para rastreamento de indicadores comportamentais baseada na arquitetura criada a partir da metodologia dos 6Ms.

## Como abrir localmente

Abra `index.html` no navegador ou sirva esta pasta em um servidor local.

Exemplo:

```powershell
python -m http.server 5173 --bind 127.0.0.1
```

Depois acesse:

```text
http://127.0.0.1:5173/index.html
```

## O que esta implementado

- Projetos de treino baseados em meta, motivacao, metodo e metricas.
- Criacao de novos projetos com primeiros comportamentos nao negociaveis.
- Tela Hoje com comportamentos rastreaveis, tarefas variaveis e score diario.
- Registro de status: feito, parcial, falhou e pular.
- Entradas numericas para indicadores de volume ou duracao.
- Check-in diario com energia, clareza, foco, obstaculo, microvitoria e ajuste.
- Calendario mensal clicavel com leitura de score por dia.
- Painel de detalhe do dia selecionado.
- Dashboard com medias, consistencia, sequencia, radar dos 6Ms, heatmap e insights.
- Revisao semanal com evidencias, aprendizados e ajustes de metodo.
- Exportacao dos dados em JSON.
- Persistencia local no navegador via `localStorage`.

## Deploy na Vercel

Esta versao foi preparada para deploy estatico na Vercel.

Opcoes:

1. Subir estes arquivos para um repositorio GitHub.
2. Importar o repositorio na Vercel.
3. Usar framework preset `Other`.
4. Build command: `npm run build`.
5. Output directory: `public`.
6. Manter o diretorio raiz como raiz do projeto.
7. Publicar.

O arquivo `vercel.json` ja inclui:

- Comando de build.
- Saida estatica em `public`.
- URLs limpas.
- Fallback para `index.html`.
- Headers basicos de seguranca.
- Cache control adequado para CSS, JS e favicon.

O build valida os arquivos e copia para `public` apenas o que deve ficar online.

## Importante sobre dados

Nesta primeira versao online, os dados ficam salvos no navegador do usuario, via `localStorage`.

Isso significa:

- Funciona sem login e sem banco de dados.
- Cada navegador/dispositivo tera seus proprios dados.
- Limpar dados do navegador pode apagar o historico.
- Para sincronizar entre dispositivos, a proxima fase precisa incluir backend, autenticacao e banco de dados.

## Proximos passos recomendados

- Transformar a base em React/TypeScript quando a experiencia estiver validada.
- Adicionar edicao completa de projetos e indicadores.
- Criar templates por objetivo: saude, vendas, escrita, estudo, carreira.
- Adicionar importacao/exportacao em CSV.
- Adicionar integracao com calendario externo.
- Criar modo mentor para revisao externa.
