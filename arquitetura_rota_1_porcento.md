# Arquitetura de Produto: Rota 1%

## 1. Norte do Produto

Rota 1% e uma aplicacao web para transformar metas ambiciosas em comportamentos rastreaveis, revisaveis e treinaveis. Ela nasce da ideia central analisada no livro "O Sucesso e Treinavel": sucesso nao e um evento, mas a consequencia de meta clara, motivacao forte, metodo, disciplina, metricas e acompanhamento.

A aplicacao nao deve ser apenas uma lista de tarefas nem apenas um habit tracker. Ela deve ser um sistema de treino comportamental. O usuario nao entra para "marcar coisas feitas"; entra para descobrir se esta vivendo o metodo que ele mesmo escolheu para chegar ao resultado desejado.

Nome de trabalho: Rota 1%
Frase de produto: "Meca o que voce fez. Ajuste o metodo. Repita melhor amanha."

## 2. Tese Central

O produto se baseia em uma distincao fundamental:

- Resultado e o que a pessoa quer conquistar.
- Comportamento e aquilo que ela precisa repetir para chegar la.
- Metrica e a ponte entre os dois.

Na pratica, o aplicativo deve responder todos os dias:

- Qual meta estou treinando?
- Por que isso importa?
- Qual metodo prometi seguir?
- Quais comportamentos executei hoje?
- Meu percentual de execucao sustenta a meta?
- Se nao sustenta, o problema foi clareza, metodo, energia, ambiente, excesso ou falta de disciplina?
- Qual ajuste pequeno torna amanha melhor?

## 3. Traducao dos 6Ms Para Software

### 3.1 Meta

No software, "Meta" vira um objeto central chamado Projeto de Treino.

Exemplos:

- Emagrecer 12 kg em 6 meses.
- Escrever um livro em 120 dias.
- Criar uma rotina de vendas com 2 horas de prospeccao diaria.
- Treinar corrida para completar 10 km.
- Desenvolver uma habilidade profissional.

Campos principais:

- Nome da meta.
- Area de vida: saude, carreira, familia, financas, espiritualidade, estudos, performance, outro.
- Estado atual.
- Estado desejado.
- Prazo.
- Criterio de sucesso.
- Nivel de audacia: moderado, forte, muito forte.
- Risco principal de desistir.

Regra de produto: nenhuma meta deve entrar sem criterio mensuravel minimo. Se o usuario escrever "ser mais saudavel", o app deve perguntar: "Como vamos saber que isso aconteceu?"

### 3.2 Motivacao

Motivacao vira o "porque visivel". Ela precisa aparecer nos momentos de decisao, nao apenas no onboarding.

Campos:

- Por que essa meta importa?
- O que muda na minha vida quando eu conquistar?
- Quem se beneficia alem de mim?
- O que acontece se eu nao fizer o que precisa ser feito?
- Frase de compromisso.
- Imagem ou simbolo opcional.

Uso na interface:

- Card no topo da tela da meta.
- Lembrete no check-in quando o usuario estiver abaixo da meta semanal.
- Tela de "recompromisso" depois de dois ou mais dias ruins.

### 3.3 Metodo

Metodo vira o plano operacional. E aqui que a aplicacao se diferencia de apps comuns.

O metodo deve ter quatro camadas:

1. Movimentos principais: os 3 a 5 grandes passos que levam da situacao atual ao resultado.
2. Habilidades-chave: capacidades que precisam ser treinadas para executar os movimentos.
3. Comportamentos rastreaveis: habitos, tarefas e sessoes de treino que comprovam execucao.
4. Premissas e nao negociaveis: aquilo que nao pode ser flexibilizado sem comprometer a meta.

Exemplo para "escrever um livro":

- Movimento 1: definir estrutura.
- Movimento 2: escrever rascunho.
- Movimento 3: revisar.
- Movimento 4: publicar.
- Habilidades: escrita diaria, clareza argumentativa, revisao.
- Comportamentos: escrever 500 palavras por dia, ler 20 paginas, revisar 30 minutos.
- Nao negociavel: escrever antes de consumir redes sociais.

### 3.4 Muita Disciplina

Disciplina vira design de execucao, nao sermao. O app deve reduzir friccao e criar compromissos visiveis.

Recursos:

- Rotinas fixas.
- Lista do dia.
- Blocos de foco.
- Prioridade clara.
- Tarefas nao negociaveis.
- Alertas de risco.
- Revisao de causa quando o dia fecha abaixo do minimo.

Regra filosofica: disciplina nao e tratada como culpa; e tratada como cumprimento do metodo.

### 3.5 Metricas

Metricas sao a camada analitica do produto.

Tipos de metricas:

- Binaria: fiz ou nao fiz.
- Numerica: quantidade, minutos, paginas, quilometros, contatos, calorias, palavras.
- Percentual: quanto do plano foi cumprido.
- Escala subjetiva: energia, clareza, foco, humor, confianca.
- Tendencia: melhorando, estavel, caindo.
- Consistencia: frequencia de execucao em periodo.
- Qualidade percebida: nota de 1 a 5 para a execucao.

Metricas principais:

- Score Diario de Execucao.
- Score Semanal de Metodo.
- Consistencia dos Nao Negociaveis.
- Progresso de Resultado.
- Tendencia de Energia.
- Causas de Falha Mais Frequentes.
- Dias 85%+.
- Progresso 1%.

### 3.6 Mentor

Mentor vira uma camada opcional de acompanhamento.

No MVP, pode ser simples:

- Campo "meu mentor/revisor".
- Exportacao de relatorio semanal.
- Compartilhamento de resumo.
- Notas de orientacao.

No futuro:

- Conta de mentor.
- Comentarios nos check-ins.
- Aprovacao de ajustes.
- Turmas ou grupos.

## 4. Principios de Produto

### 4.1 Clareza Antes de Controle

O app nao deve permitir um excesso de metricas sem clareza. O usuario deve saber qual resultado cada comportamento alimenta.

### 4.2 Medir Input Antes de Cobrar Output

A tela diaria deve priorizar comportamentos executados. O output entra no painel semanal/mensal.

### 4.3 Pequenas Vitorias Criam Continuidade

O produto deve celebrar microconquistas, mas sem infantilizar a experiencia. O tom deve ser adulto, direto e elegante.

### 4.4 Falha Vira Diagnostico

Um dia ruim nao deve apenas ficar vermelho. Ele deve gerar pergunta:

- Planejei demais?
- Dormi mal?
- Perdi clareza?
- O ambiente atrapalhou?
- A tarefa estava grande demais?
- A prioridade estava errada?
- O metodo precisa mudar?

### 4.5 Calendario Como Espelho

O calendario nao e so agenda. Ele mostra o historico do comportamento. Cada dia clicavel deve revelar: plano, execucao, notas, energia, causa de falhas e ajuste do dia seguinte.

### 4.6 Ritmo Sustentavel

O produto deve evitar que o usuario crie quinze habitos de uma vez. A filosofia dos mini-habitos pede progressao.

Regra sugerida:

- Inicio: ate 3 comportamentos nao negociaveis.
- Depois de 14 dias com consistencia razoavel, sugerir novo comportamento.
- Se a consistencia cair, recomendar simplificacao.

## 5. Referencias de Apps e Padroes Aproveitados

Os padroes abaixo foram analisados para orientar a arquitetura, sem copiar identidade visual ou experiencia de uma unica ferramenta.

- Todoist: captura rapida, projetos, prioridades, labels, subtarefas, visualizacoes flexiveis em lista, calendario e quadro, alem de historico e visualizacoes de produtividade. Referencia: https://www.todoist.com/features
- Todoist Calendar Integration: tarefas com data, horario e duracao espelhadas em calendario, eventos visiveis nas telas de hoje e proximos dias. Referencia: https://get.todoist.help/hc/en-us/articles/13258169208860-Use-the-Calendar-integration
- TickTick: uniao de tarefas, calendario, Pomodoro, habitos e matriz de Eisenhower em uma ferramenta unica. Referencia: https://ticktick.com/?language=en_
- Streaks: check-in rapido, sequencias, estatisticas, notas diarias e tarefas positivas/negativas. Referencia: https://apps.apple.com/us/app/streaks/id963034692
- Habitify: agrupamento de habitos por periodo do dia, lembretes, timer de foco e insights visuais. Referencia: https://apps.apple.com/us/app/habitify-habit-tracker/id1111447047
- Strides: tipos diferentes de trackers, relatorios de progresso, calendario de sequencias, calendario de marcos e notas de meta. Referencia: https://apps.apple.com/us/app/strides-habit-tracker-goals/id672401817
- Way of Life: foco em tendencias positivas e negativas, graficos, notas, tags e feedback semanal/mensal. Referencia: https://apps.apple.com/us/app/way-of-life-habit-tracker/id393159800
- Habo: simplicidade de registro com sucesso, entrada numerica, falha, pular sem quebrar sequencia e notas. Referencia: https://habo.space/

Conclusao de benchmark: os melhores apps vencem por baixa friccao no check-in e boa visualizacao historica. A nossa diferenca deve ser a camada metodologica: nao apenas "fiz o habito", mas "isso prova que meu metodo esta funcionando?"

## 6. Arquitetura Funcional

### 6.1 Modulos Principais

1. Inicio / Hoje
2. Calendario
3. Projetos de Treino
4. Metodo
5. Check-in Diario
6. Dashboard
7. Revisao Semanal
8. Biblioteca de Habitos e Indicadores
9. Ajustes e Exportacao

### 6.2 Inicio / Hoje

Objetivo: ser a tela de execucao do dia.

Blocos:

- Saudacao e score previsto do dia.
- Meta ativa principal.
- Motivo do dia.
- Nao negociaveis.
- Rotina fixa.
- Tarefas variaveis.
- Blocos de foco.
- Botao de check-in rapido.
- Mini calendario semanal.

Interacoes:

- Marcar comportamento como feito.
- Inserir valor numerico.
- Iniciar timer de foco.
- Arrastar tarefa para outro horario.
- Abrir detalhes.
- Marcar "pular justificadamente".
- Registrar nota rapida.

Estados:

- Planejado.
- Em progresso.
- Feito.
- Parcial.
- Pulado.
- Nao feito.

### 6.3 Calendario

Objetivo: ser o espelho visual da constancia.

Visualizacoes:

- Dia.
- Semana.
- Mes.
- Ano em heatmap.

Celula de dia:

- Cor por Score Diario.
- Pequenos pontos por area de vida.
- Indicador de nao negociaveis.
- Icone de nota se houver reflexao.
- Borda especial para dia 85%+.

Clique em um dia abre painel lateral:

- Plano daquele dia.
- Comportamentos executados.
- Percentual de execucao.
- Energia e humor.
- Observacoes.
- Causas de falha.
- Microvitoria.
- Ajuste definido para o dia seguinte.

Regras visuais:

- Verde: 85% ou mais.
- Azul: 70% a 84%.
- Amarelo: 50% a 69%.
- Vermelho suave: abaixo de 50%.
- Cinza: dia sem plano.
- Roxo/indigo apenas como acento, nao como paleta dominante.

### 6.4 Projetos de Treino

Objetivo: organizar cada grande meta.

Tela de lista:

- Cards compactos com progresso, consistencia, prazo e status.
- Filtros por area.
- Status: ativo, pausado, concluido, arquivado.

Tela do projeto:

- Meta.
- Motivacao.
- Metodo.
- Indicadores.
- Calendario filtrado.
- Dashboard da meta.
- Historico de revisoes.

### 6.5 Metodo

Objetivo: transformar objetivo em sistema.

Secoes:

- Mapa dos 6Ms.
- Movimentos principais.
- Habilidades-chave.
- Comportamentos.
- Nao negociaveis.
- Premissas.
- Riscos.
- Sinais de ajuste.

Fluxo guiado:

1. Defina a meta.
2. Defina a motivacao.
3. Quebre em movimentos.
4. Escolha habilidades.
5. Crie comportamentos rastreaveis.
6. Defina metricas.
7. Defina minimo aceitavel.
8. Agende rotina.

### 6.6 Check-in Diario

Objetivo: fechar o ciclo do dia.

Perguntas:

- O que foi executado?
- O que ficou parcial?
- O que nao foi feito?
- Qual foi minha energia?
- Qual foi minha clareza?
- Qual foi meu foco?
- Qual foi o principal obstaculo?
- Qual microvitoria merece ser registrada?
- O que ajusto amanha?

Interface:

- Check-in em ate 2 minutos.
- Campos opcionais para reflexao profunda.
- Uma tela final com Score Diario e uma frase de leitura fria: "Hoje seu metodo ficou forte/fraco por causa de..."

### 6.7 Dashboard

Objetivo: mostrar se o metodo esta funcionando.

Cards principais:

- Score Diario medio.
- Score Semanal do Metodo.
- Nao negociaveis cumpridos.
- Melhor sequencia.
- Semana atual vs semana anterior.
- Progresso do resultado.
- Energia media.
- Principal causa de falha.
- Habito mais consistente.
- Habito mais fragil.

Graficos:

- Linha de progresso do resultado.
- Barras de execucao por dia.
- Heatmap anual.
- Radar dos 6Ms.
- Distribuicao de causas de falha.
- Correlacao simples entre energia e execucao.

### 6.8 Revisao Semanal

Objetivo: impedir que a pessoa so acumule dados sem aprender.

Fluxo:

1. Resumo da semana.
2. Top 3 comportamentos.
3. Maiores quebras.
4. O que gerou progresso.
5. O que drenou energia.
6. O metodo precisa de ajuste?
7. O que fica, sai ou muda na proxima semana?

Saida:

- Relatorio semanal.
- Plano da proxima semana.
- Uma decisao de foco.
- Ate 3 ajustes de metodo.

## 7. Modelo de Dados

### 7.1 Entidades

User

- id
- name
- email
- timezone
- createdAt

TrainingProject

- id
- userId
- title
- area
- currentState
- desiredState
- successCriteria
- deadline
- status
- audacityLevel
- createdAt
- updatedAt

Motivation

- id
- projectId
- why
- lifeChange
- whoBenefits
- costOfInaction
- commitmentPhrase
- imageUrl

Method

- id
- projectId
- description
- minimumExecutionScore
- reviewCadence
- assumptions
- nonNegotiableRules

Movement

- id
- methodId
- title
- order
- description
- targetDate

Skill

- id
- projectId
- title
- description
- levelNow
- levelTarget

Behavior

- id
- projectId
- skillId
- title
- type
- area
- scheduleType
- frequencyRule
- targetValue
- unit
- minimumValue
- weight
- isNonNegotiable
- difficultyLevel
- active

DailyPlan

- id
- userId
- date
- plannedScore
- status
- createdAt

PlannedItem

- id
- dailyPlanId
- behaviorId
- title
- itemType
- scheduledStart
- scheduledEnd
- eisenhowerQuadrant
- priority
- weight

CheckIn

- id
- userId
- date
- dailyScore
- energyScore
- clarityScore
- focusScore
- mood
- mainObstacle
- microWin
- adjustmentForTomorrow
- note
- createdAt

BehaviorLog

- id
- behaviorId
- checkInId
- date
- status
- value
- qualityScore
- note
- failureReason

WeeklyReview

- id
- projectId
- weekStart
- weekEnd
- executionAverage
- wins
- failures
- lessons
- methodAdjustments
- nextWeekFocus

### 7.2 Tipos de Behavior

- binary: fez ou nao fez.
- numeric: valor acumulado.
- duration: minutos ou horas.
- counter: repeticoes.
- avoidance: comportamento a evitar.
- milestone: marco de projeto.
- subjective: nota de percepcao.

### 7.3 Status de Log

- done
- partial
- missed
- skipped
- not_applicable

"Skipped" e importante. Nem todo dia nao feito deve quebrar a leitura da consistencia, especialmente quando havia justificativa real. Isso evita que a ferramenta vire maquina de culpa.

## 8. Regras de Calculo

### 8.1 Score Diario de Execucao

Cada item planejado tem um peso. O score diario e:

Score Diario = soma dos pesos cumpridos / soma dos pesos planejados * 100

Status:

- done: 100% do peso.
- partial: proporcional ao valor entregue ou 50% padrao.
- missed: 0%.
- skipped: removido do denominador se justificado; 0% se nao justificado.

### 8.2 Regra dos 85%

Inspirada no painel diario citado na analise do livro:

- 85% ou mais: dia forte.
- 70% a 84%: dia consistente, mas com ajuste.
- 50% a 69%: dia vulneravel.
- abaixo de 50%: revisar causa.

Abaixo de 85%, o app deve solicitar uma analise curta:

- O que impediu?
- Foi falha de execucao ou planejamento?
- O que muda amanha?

### 8.3 Score Semanal do Metodo

Score Semanal = media ponderada dos Scores Diarios + bonus de revisao + consistencia dos nao negociaveis.

Sugestao:

- 70% Score Diario medio.
- 20% Nao negociaveis.
- 10% Revisao semanal feita.

### 8.4 Progresso 1%

Nao deve ser literalmente 1% matematico todos os dias. Deve representar progresso marginal.

Indicadores:

- Fiz algo melhor que ontem?
- Mantive o comportamento minimo?
- Reduzi uma falha?
- Aumentei clareza?
- Ajustei o metodo?

O app pode registrar o "1% do dia" como campo de microvitoria.

### 8.5 Radar dos 6Ms

Cada M recebe uma nota de 0 a 10.

- Meta: clareza da meta.
- Motivacao: forca do motivo.
- Metodo: qualidade do plano.
- Muita disciplina: execucao dos compromissos.
- Metricas: regularidade de medicao.
- Mentor: nivel de acompanhamento/revisao.

Esse radar ajuda a diagnosticar: o problema nao e sempre "falta de disciplina".

## 9. Jornada do Usuario

### 9.1 Primeiro Acesso

1. O usuario escolhe uma area da vida.
2. Define uma meta.
3. O app transforma a meta vaga em meta mensuravel.
4. O usuario registra motivacao.
5. O usuario escolhe ate 3 comportamentos iniciais.
6. O app cria a primeira semana.
7. Usuario cai na tela Hoje.

### 9.2 Uso Diario

1. Abre Hoje.
2. Ve nao negociaveis.
3. Executa blocos.
4. Marca comportamentos.
5. Fecha check-in.
6. Recebe score e ajuste.

### 9.3 Uso Semanal

1. Abre Revisao.
2. Ve tendencia.
3. Identifica comportamento forte e fragil.
4. Ajusta metodo.
5. Planeja proxima semana.

### 9.4 Uso Mensal

1. Revisa progresso da meta.
2. Decide manter, ajustar, pausar ou concluir projeto.
3. Avalia radar dos 6Ms.
4. Compara resultado e comportamento.

## 10. Arquitetura de Interface

### 10.1 Layout Base

Desktop:

- Sidebar esquerda fixa.
- Conteudo central.
- Painel lateral direito contextual.

Mobile:

- Navegacao inferior.
- Cards compactos.
- Check-in em tela cheia.
- Calendario mensal com painel por baixo.

Navegacao principal:

- Hoje
- Calendario
- Projetos
- Dashboard
- Revisao

### 10.2 Tela Hoje

Composicao:

- Topo: data, score previsto, botao de check-in.
- Faixa de foco: meta ativa e frase de motivacao.
- Coluna principal: lista de execucao.
- Coluna direita: mini calendario, energia, progresso semanal.

Componentes:

- BehaviorCheckRow
- NumericTrackerInput
- FocusBlock
- NonNegotiableBadge
- DailyScoreRing
- MicroWinInput

### 10.3 Tela Calendario

Composicao:

- Alternador Dia/Semana/Mes/Ano.
- Calendario clicavel.
- Filtros por projeto e area.
- Painel lateral do dia selecionado.

Componentes:

- CalendarGrid
- DayCell
- ScoreHeatColor
- DayDetailDrawer
- WeekStrip
- YearHeatmap

### 10.4 Tela Projeto

Composicao:

- Header com meta, prazo e status.
- Tabs: Visao geral, Metodo, Indicadores, Calendario, Revisoes.
- Cards de metricas.
- Linha do tempo dos movimentos.

### 10.5 Tela Revisao Semanal

Composicao:

- Resumo automatico.
- Perguntas guiadas.
- Decisoes de ajuste.
- Plano da proxima semana.

## 11. Direcao Visual

### 11.1 Personalidade Visual

O produto deve parecer:

- Maduro.
- Calmo.
- Preciso.
- Humano.
- Focado.
- Elegante sem luxo excessivo.

Evitar:

- Gamificacao infantil.
- Excesso de vermelho punitivo.
- Visual de planilha fria demais.
- Gradientes chamativos.
- Paleta de uma cor so.

### 11.2 Paleta

Base:

- Fundo claro: #F7F5EF
- Superficie: #FFFFFF
- Texto principal: #1F2933
- Texto secundario: #67727E
- Linha/borda: #E4E0D6

Acentos:

- Verde execucao: #2F9E6D
- Azul metodo: #3B82A0
- Amarelo atencao: #D8A21B
- Coral ajuste: #D86A5B
- Indigo foco: #5654A2

Dark mode futuro:

- Fundo: #111315
- Superficie: #1A1D21
- Texto: #F4F1EA
- Bordas: #2E3338

### 11.3 Tipografia

- Interface: Inter, system-ui ou equivalente.
- Numeros e dashboards: tabular numbers.
- Tamanhos contidos; sem hero gigante dentro do app.

### 11.4 Componentes Visuais

- Cards de raio pequeno, ate 8px.
- Icones funcionais.
- Botao primario apenas para acao principal da tela.
- Segment control para alternar views.
- Tooltips para iconografia menos obvia.
- Heatmap para consistencia.
- Ring chart para score diario.
- Barras horizontais para comportamentos.
- Linha para progresso de resultado.

## 12. Arquitetura Tecnica Recomendada

### 12.1 MVP

Stack sugerida:

- Frontend: React + TypeScript + Vite.
- Estilo: Tailwind CSS.
- Estado local: Zustand.
- Datas: date-fns.
- Graficos: Recharts.
- Calendario: componente proprio simples para controle total.
- Persistencia inicial: IndexedDB via Dexie ou localStorage estruturado.

Por que assim:

- Rapido para prototipar.
- Otimo para uma aplicacao visual.
- Permite funcionar sem backend inicialmente.
- Facil evoluir para PWA.

### 12.2 Versao Com Conta

Quando o MVP estiver validado:

- Backend: Supabase ou PostgreSQL + API.
- Auth: Supabase Auth.
- Sync: tabelas por usuario.
- Exportacao: CSV/PDF.
- Relatorios por email.

### 12.3 Estrutura de Pastas

src/

- app/
- components/
- features/
  - today/
  - calendar/
  - projects/
  - method/
  - checkin/
  - dashboard/
  - review/
- domain/
  - scoring/
  - planning/
  - recurrence/
  - insights/
- data/
  - repositories/
  - seed/
- styles/
- utils/

### 12.4 Separacao Importante

Regras de calculo nao devem ficar presas aos componentes visuais.

Camadas:

- UI: mostra e captura.
- Domain: calcula score, consistencia, tendencias.
- Data: salva e carrega.
- Insights: interpreta dados e sugere ajustes.

## 13. Regras de Insight

O app deve gerar diagnosticos simples, sem fingir inteligencia demais.

Exemplos:

- "Seu score cai nos dias em que energia fica abaixo de 3."
- "O comportamento mais fraco da semana foi leitura."
- "Voce planejou 42 itens e concluiu 19. Talvez o metodo esteja pesado."
- "Seus nao negociaveis tiveram 92% de consistencia. O metodo esta sustentavel."
- "Tres falhas seguidas vieram por agenda. Ajuste o horario, nao a meta."

Categorias de causa:

- Energia.
- Clareza.
- Excesso de plano.
- Ambiente.
- Tempo.
- Emocional.
- Esquecimento.
- Falta de preparo.
- Metodo inadequado.
- Prioridade concorrente.

## 14. MVP Ideal

O MVP nao deve tentar fazer tudo. Deve provar a tese do produto.

MVP deve incluir:

- Criacao de projeto pela logica dos 6Ms.
- Ate 3 comportamentos iniciais.
- Tela Hoje.
- Check-in diario.
- Calendario mensal clicavel.
- Dashboard simples.
- Revisao semanal.
- Persistencia local.

Fora do MVP:

- Conta de mentor.
- IA.
- Integracao Google Calendar.
- App mobile nativo.
- Notificacoes push.
- Comunidade.
- Marketplace de templates.

## 15. Roadmap

### Fase 1: Prototipo Funcional

- Interface navegavel.
- Dados locais.
- Calendario clicavel.
- Check-ins.
- Scores.
- Dashboard basico.

### Fase 2: Produto de Uso Real

- Edicao completa de projetos.
- Rotinas recorrentes.
- Revisao semanal robusta.
- Exportacao.
- PWA.
- Backup local.

### Fase 3: Produto Inteligente

- Insights automaticos.
- Sugestoes de ajuste.
- Templates por objetivo.
- Modo mentor.
- Sincronizacao em nuvem.

### Fase 4: Ecossistema

- Grupos.
- Relatorios compartilhaveis.
- Integracoes.
- App mobile.
- Biblioteca de metodos.

## 16. Criterios de Qualidade Para a Implementacao

A primeira versao deve ser considerada boa se:

- O usuario consegue criar uma meta em menos de 5 minutos.
- O usuario entende a diferenca entre meta, metodo e metrica.
- O check-in diario leva menos de 2 minutos.
- O calendario deixa claro quais dias foram fortes ou fracos.
- O dashboard mostra uma acao de ajuste, nao apenas numeros.
- O app nao pune a falha; ajuda a interpretar.
- A interface parece uma ferramenta de trabalho pessoal seria e bonita.

## 17. Riscos de Produto

### 17.1 Virar Checklist Com Nome Bonito

Mitigacao: manter 6Ms, revisao e diagnostico como nucleo.

### 17.2 Excesso de Complexidade

Mitigacao: onboarding guiado e limite inicial de comportamentos.

### 17.3 Culpa e Abandono

Mitigacao: uso de "ajuste", "diagnostico" e "recompromisso"; nao usar linguagem punitiva.

### 17.4 Metricas Frias Demais

Mitigacao: combinar numeros com notas, energia, motivacao e microvitorias.

### 17.5 Visual Bonito Mas Pouco Util

Mitigacao: toda visualizacao deve responder uma pergunta pratica.

## 18. Principio Final de Design

O Rota 1% deve funcionar como um espelho de treino:

- Mostra o que foi prometido.
- Registra o que foi feito.
- Revela a distancia entre os dois.
- Ajuda a ajustar o metodo.
- Reforca pequenas conquistas.
- Mantem o usuario em movimento.

O produto ideal nao pergunta apenas "voce fez?". Ele pergunta: "o que o seu comportamento de hoje ensina sobre o seu metodo?"
