# Deploy na Vercel

## Resumo

O Rota 1% esta pronto para deploy como site estatico na Vercel.

Arquivos fonte principais:

- `index.html`
- `styles.css`
- `app.js`
- `favicon.svg`
- `site.webmanifest`
- `robots.txt`
- `vercel.json`

Durante o build, apenas os arquivos publicos sao copiados para `public/`.

## Passo a passo

1. Crie um repositorio no GitHub.
2. Envie esta pasta para o repositorio.
3. Acesse a Vercel.
4. Clique em `Add New Project`.
5. Importe o repositorio.
6. Em framework, escolha `Other`.
7. Build command: `npm run build`.
8. Output directory: `public`.
9. Mantenha a raiz do projeto como raiz do projeto.
10. Publique.

## Build

O projeto nao depende de bibliotecas externas.

O script de build apenas valida os arquivos estaticos:

```bash
npm run build
```

Depois da validacao, ele gera `public/` com os arquivos que devem ser publicados.

## Persistencia

Os dados da aplicacao sao salvos no navegador do usuario.

Esta versao nao possui:

- Login.
- Banco de dados.
- Sincronizacao entre dispositivos.
- Backup automatico em nuvem.

Para uma versao SaaS completa, a proxima etapa recomendada e adicionar:

- Supabase ou outro backend.
- Autenticacao.
- Tabelas para projetos, comportamentos, logs e revisoes.
- Exportacao/importacao por usuario.

## Checklist antes de publicar

- Rodar `npm run build`.
- Abrir `index.html` localmente ou via servidor local.
- Testar criacao de projeto.
- Testar check-in.
- Testar calendario.
- Testar exportacao.
- Confirmar que `qa_*.png` e documentos internos nao estao dentro de `public/`.
