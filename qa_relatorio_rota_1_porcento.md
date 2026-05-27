# Relatorio de QA: Rota 1%

Data: 2026-05-27

## Escopo

Foi realizada uma rodada de QA funcional, visual e tecnica sobre a primeira versao do aplicativo Rota 1%.

Areas testadas:

- Inicializacao do app.
- Navegacao entre modulos.
- Persistencia local.
- Tela Hoje.
- Indicadores comportamentais.
- Calculo de score ponderado.
- Tarefas variaveis.
- Calendario clicavel.
- Dashboard.
- Revisao semanal.
- Criacao de projeto.
- Exclusao de projeto.
- Exportacao.
- Responsividade.
- Erros de console.

## Resultado Geral

Status final: aprovado.

Nao ha falhas funcionais conhecidas nos fluxos principais testados.

## Correcoes Feitas Durante o QA

1. Modal de novo projeto
   - Problema: o modal aparecia aberto ao carregar a pagina porque a classe CSS sobrescrevia o atributo `hidden`.
   - Correcao: adicionada regra global `[hidden] { display: none !important; }`.

2. Atualizacao de score em campos numericos
   - Problema: o score podia demorar a refletir valores digitados em indicadores numericos.
   - Correcao: o app agora salva e recalcula tambem durante o evento de entrada, com pequeno atraso para nao atrapalhar a digitacao.

3. Navegacao entre modulos
   - Problema: ao trocar de modulo, a pagina podia manter a rolagem da tela anterior.
   - Correcao: adicionada rotina de retorno ao topo ao trocar de modulo ou mudar o dia pela barra superior.

4. Cards de metricas com texto longo
   - Problema: cards de revisao exibiam textos longos no tamanho visual de metricas numericas.
   - Correcao: criado estilo especifico para metricas textuais.

5. Exclusao de projeto
   - Problema: a exclusao usava confirmacao nativa do navegador, menos profissional e ruim para teste automatizado.
   - Correcao: substituida por confirmacao interna com botoes "Confirmar" e "Cancelar".

## Bateria de Testes Executada

### Tecnicos

- Sintaxe JavaScript validada com `node --check`.
- Busca por `TODO`, `debugger` e `console.log` em arquivos finais.
- Servidor local validado.
- Console do navegador verificado apos fluxos principais.

Resultado: aprovado.

### Navegacao

- Tela Hoje renderiza.
- Projeto demonstrativo inicial aparece.
- Navegacao possui 5 modulos principais.
- Calendario abre corretamente.
- Projetos abre corretamente.
- Dashboard abre corretamente.
- Revisao abre corretamente.
- Retorno para Hoje funciona.

Resultado: aprovado.

### Tela Hoje e Score

Validacao em estado limpo:

- Score inicial: 0.
- Marcar comportamento binario como feito: score 20.
- Inserir 600 palavras no indicador numerico: score 47.
- Inserir 30 minutos de leitura: score 60.
- Marcar demais comportamentos do dia: score 87.
- Marcar tarefas variaveis: score 100.
- Adicionar nova tarefa variavel: score recalcula para 94.
- Marcar nova tarefa: score retorna a 100.

Resultado: aprovado.

### Calendario

- Calendario mensal abre.
- Mes correto aparece.
- Dia atual mostra score calculado.
- Navegacao para mes anterior funciona.
- Navegacao de volta funciona.
- Clique no dia selecionado abre painel de detalhe.
- Painel mostra comportamentos, microvitoria e ajuste.

Resultado: aprovado.

### Dashboard

- Dashboard abre corretamente.
- Cards principais aparecem.
- Tendencia semanal aparece.
- Consistencia por indicador aparece.
- Radar dos 6Ms aparece.
- Heatmap de 90 dias aparece.
- Insights acionaveis aparecem.

Resultado: aprovado.

### Revisao Semanal

- Revisao semanal abre.
- Evidencia dos dias da semana aparece.
- Cards de media, melhor indicador e ponto fragil aparecem.
- Campos de vitorias, falhas, aprendizados, ajustes e foco aparecem.
- Salvamento da revisao exibe confirmacao.

Resultado: aprovado.

### Projetos

- Modal de novo projeto abre.
- Projeto minimo valido pode ser criado.
- Projeto criado fica ativo.
- Comportamento inicial aparece no projeto e na tela Hoje.
- Confirmacao de exclusao aparece.
- Cancelar exclusao preserva projeto.
- Confirmar exclusao remove projeto.

Resultado: aprovado.

### Exportacao

- Botao exportar executa.
- Confirmacao visual aparece.

Resultado: aprovado.

### Responsividade

- Layout desktop recarrega sem erros.
- Layout mobile recarrega sem erros.
- Navegacao compacta aparece.
- Controles principais continuam acessiveis.
- Cards empilham corretamente em largura estreita.

Resultado: aprovado.

## Observacoes de Qualidade

- A aplicacao esta funcional como prototipo local serio.
- O modelo de score esta coerente com a proposta: mede comportamento, tarefas variaveis e nao negociaveis.
- O calendario funciona como espelho de comportamento, nao apenas agenda.
- O dashboard ja mostra a diferenca central do produto: diagnostico de metodo, nao apenas habitos.
- A revisao semanal fecha o ciclo metodologico.

## Riscos Restantes Para Fases Futuras

- Ainda nao ha backend nem sincronizacao entre dispositivos.
- Ainda nao ha importacao de dados.
- Edicao profunda de projeto e indicadores ainda e limitada.
- Ainda nao ha testes automatizados permanentes em arquivo.
- Ainda nao ha auditoria formal de acessibilidade.

Esses pontos nao bloqueiam o prototipo atual, mas devem entrar em uma proxima fase se o objetivo for transformar em produto completo.

