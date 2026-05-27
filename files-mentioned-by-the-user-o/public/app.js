(() => {
  const STORAGE_KEY = "rota1_state_v1";
  const app = document.getElementById("app");
  const modal = document.getElementById("project-modal");
  const projectForm = document.getElementById("project-form");
  const toast = document.getElementById("toast");
  let fallbackSerializedState = null;
  let storageWarningShown = false;

  const VIEWS = {
    today: {
      nav: "Hoje",
      icon: "H",
      title: "Hoje",
      subtitle: "Execute o método do dia e feche o ciclo com evidência.",
    },
    calendar: {
      nav: "Calendário",
      icon: "C",
      title: "Calendário",
      subtitle: "Veja sua constância como um espelho do comportamento.",
    },
    projects: {
      nav: "Projetos",
      icon: "P",
      title: "Projetos de treino",
      subtitle: "Transforme metas em método, indicadores e hábitos treináveis.",
    },
    dashboard: {
      nav: "Dashboard",
      icon: "D",
      title: "Dashboard",
      subtitle: "Leia os sinais do método antes de culpar a disciplina.",
    },
    review: {
      nav: "Revisão",
      icon: "R",
      title: "Revisão semanal",
      subtitle: "Aprenda com a semana e ajuste o próximo ciclo.",
    },
  };

  const FAILURE_REASONS = [
    "Energia baixa",
    "Falta de clareza",
    "Excesso de plano",
    "Ambiente",
    "Tempo",
    "Emocional",
    "Esquecimento",
    "Falta de preparo",
    "Método inadequado",
    "Prioridade concorrente",
  ];

  const QUADRANTS = {
    do: "Urgente e importante",
    plan: "Importante, não urgente",
    delegate: "Urgente, não importante",
    eliminate: "Eliminar ou reduzir",
  };

  let state = loadState();

  function id(prefix) {
    if (window.crypto && window.crypto.randomUUID) {
      return `${prefix}_${window.crypto.randomUUID()}`;
    }
    return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function toISO(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function fromISO(iso) {
    const [year, month, day] = iso.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  function todayISO() {
    return toISO(new Date());
  }

  function addDays(iso, amount) {
    const date = fromISO(iso);
    date.setDate(date.getDate() + amount);
    return toISO(date);
  }

  function startOfWeek(iso) {
    const date = fromISO(iso);
    const day = date.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    date.setDate(date.getDate() + diff);
    return toISO(date);
  }

  function startOfMonth(iso) {
    const date = fromISO(iso);
    return toISO(new Date(date.getFullYear(), date.getMonth(), 1));
  }

  function addMonths(iso, amount) {
    const date = fromISO(iso);
    date.setMonth(date.getMonth() + amount);
    return toISO(date);
  }

  function formatDate(iso, options = {}) {
    return new Intl.DateTimeFormat("pt-BR", {
      weekday: options.weekday ?? "short",
      day: "2-digit",
      month: options.month ?? "short",
      year: options.year ?? undefined,
    }).format(fromISO(iso));
  }

  function formatMonth(iso) {
    return new Intl.DateTimeFormat("pt-BR", {
      month: "long",
      year: "numeric",
    }).format(fromISO(iso));
  }

  function readStoredState() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch {
      return fallbackSerializedState;
    }
  }

  function writeStoredState(serializedState) {
    fallbackSerializedState = serializedState;
    try {
      window.localStorage.setItem(STORAGE_KEY, serializedState);
      return true;
    } catch {
      if (!storageWarningShown) {
        storageWarningShown = true;
        showToast("Seu navegador bloqueou o armazenamento local. Os dados podem não permanecer após fechar a aba.");
      }
      return false;
    }
  }

  function saveState() {
    writeStoredState(JSON.stringify(state));
  }

  function loadState() {
    const raw = readStoredState();
    if (!raw) return seedState();
    try {
      const parsed = JSON.parse(raw);
      return normalizeState(parsed);
    } catch {
      return seedState();
    }
  }

  function normalizeState(input) {
    const seeded = seedState();
    return {
      ...seeded,
      ...input,
      selectedDate: input.selectedDate || todayISO(),
      calendarCursor: input.calendarCursor || input.selectedDate || todayISO(),
      projects: Array.isArray(input.projects) ? input.projects : seeded.projects,
      behaviors: Array.isArray(input.behaviors) ? input.behaviors : seeded.behaviors,
      tasks: Array.isArray(input.tasks) ? input.tasks : [],
      logs: input.logs && typeof input.logs === "object" ? input.logs : {},
      checkins: input.checkins && typeof input.checkins === "object" ? input.checkins : {},
      reviews: input.reviews && typeof input.reviews === "object" ? input.reviews : {},
    };
  }

  function seedState() {
    const today = todayISO();
    const projectId = "project_book";
    const behaviors = [
      {
        id: "behavior_plan",
        projectId,
        title: "Planejar o dia antes de consumir informação",
        type: "binary",
        area: "Método",
        frequency: "daily",
        targetValue: 1,
        unit: "check",
        weight: 3,
        isNonNegotiable: true,
        difficultyLevel: 1,
      },
      {
        id: "behavior_write",
        projectId,
        title: "Escrever 600 palavras do projeto",
        type: "numeric",
        area: "Execução",
        frequency: "daily",
        targetValue: 600,
        unit: "palavras",
        weight: 4,
        isNonNegotiable: true,
        difficultyLevel: 3,
      },
      {
        id: "behavior_read",
        projectId,
        title: "Ler ou estudar 30 minutos",
        type: "duration",
        area: "Habilidade",
        frequency: "daily",
        targetValue: 30,
        unit: "min",
        weight: 2,
        isNonNegotiable: false,
        difficultyLevel: 2,
      },
      {
        id: "behavior_move",
        projectId,
        title: "Treino físico de base",
        type: "duration",
        area: "Energia",
        frequency: "weekdays",
        targetValue: 40,
        unit: "min",
        weight: 2,
        isNonNegotiable: true,
        difficultyLevel: 2,
      },
      {
        id: "behavior_review",
        projectId,
        title: "Revisar o método e ajustar amanhã",
        type: "binary",
        area: "Métricas",
        frequency: "mon_wed_fri",
        targetValue: 1,
        unit: "check",
        weight: 2,
        isNonNegotiable: false,
        difficultyLevel: 2,
      },
    ];

    const logs = {};
    const checkins = {};
    for (let offset = -24; offset <= -1; offset += 1) {
      const date = addDays(today, offset);
      behaviors.forEach((behavior, index) => {
        if (!isBehaviorDue(behavior, date)) return;
        const pattern = Math.abs(offset + index * 2) % 9;
        let status = "done";
        let value = behavior.targetValue;
        if (pattern === 0) {
          status = "missed";
          value = 0;
        } else if (pattern === 1 || pattern === 2) {
          status = "partial";
          value = Math.round(behavior.targetValue * 0.55);
        } else if (pattern === 3) {
          status = "skipped";
          value = 0;
        }
        logs[logKey(behavior.id, date)] = {
          behaviorId: behavior.id,
          date,
          status,
          value,
          qualityScore: status === "done" ? 4 : 3,
          failureReason:
            status === "missed" ? FAILURE_REASONS[Math.abs(offset) % FAILURE_REASONS.length] : "",
          note: "",
        };
      });
      if (offset % 2 === 0) {
        checkins[date] = {
          date,
          energyScore: 3 + (Math.abs(offset) % 3),
          clarityScore: 3 + (Math.abs(offset + 1) % 3),
          focusScore: 3 + (Math.abs(offset + 2) % 3),
          mainObstacle: offset % 6 === 0 ? "Excesso de plano" : "Tempo",
          microWin: offset % 4 === 0 ? "Mantive o não negociável mesmo com agenda apertada." : "",
          adjustmentForTomorrow: offset % 5 === 0 ? "Reduzir uma tarefa variável e proteger o bloco de escrita." : "",
          note: "",
        };
      }
    }

    const tasks = [
      {
        id: "task_today_1",
        projectId,
        date: today,
        title: "Definir a única coisa importante do dia",
        quadrant: "do",
        done: false,
      },
      {
        id: "task_today_2",
        projectId,
        date: today,
        title: "Separar 45 minutos sem mensagens para execução profunda",
        quadrant: "plan",
        done: false,
      },
    ];

    return {
      version: 1,
      activeView: "today",
      selectedDate: today,
      calendarCursor: today,
      selectedProjectId: projectId,
      projects: [
        {
          id: projectId,
          title: "Livro e método de performance",
          area: "Carreira",
          currentState: "Ideias dispersas e rotina ainda vulnerável a interrupções.",
          desiredState: "Método de escrita consistente, com capítulos avançando toda semana.",
          successCriteria: "Primeiro rascunho concluído com 45.000 palavras.",
          deadline: addDays(today, 120),
          status: "active",
          audacityLevel: "forte",
          mentor: "",
          motivation: {
            why:
              "Construir uma obra útil e provar, com comportamento diário, que a disciplina pode ser treinada.",
            lifeChange: "Mais clareza, autoridade e uma rotina de criação que não dependa de motivação.",
            whoBenefits: "Eu, meus leitores e as pessoas que precisam de um método simples para avançar.",
            costOfInaction: "Continuar no campo do achismo e deixar a meta grande sem execução consistente.",
            commitmentPhrase: "Quem tem meta tem método; quem mede, ajusta.",
          },
          method: {
            description:
              "Proteger o primeiro bloco do dia, escrever antes de consumir informação, medir execução e revisar semanalmente.",
            minimumExecutionScore: 85,
            reviewCadence: "weekly",
            assumptions: "Sono e energia sustentam a escrita; excesso de plano reduz constância.",
            nonNegotiableRules: "Planejar o dia, escrever o mínimo e fechar check-in.",
          },
          movements: [
            { title: "Clarear estrutura", description: "Definir partes, capítulos e promessa do livro." },
            { title: "Executar rascunho", description: "Produzir texto bruto com meta diária." },
            { title: "Revisar método", description: "Ajustar rotina, remover bloqueios e melhorar qualidade." },
            { title: "Finalizar entrega", description: "Consolidar versão pronta para leitura externa." },
          ],
          skills: [
            { title: "Escrita diária", levelNow: 5, levelTarget: 9 },
            { title: "Clareza argumentativa", levelNow: 6, levelTarget: 9 },
            { title: "Gestão de foco", levelNow: 5, levelTarget: 8 },
          ],
          createdAt: today,
        },
      ],
      behaviors,
      tasks,
      logs,
      checkins,
      reviews: {},
    };
  }

  function logKey(behaviorId, date) {
    return `${behaviorId}|${date}`;
  }

  function reviewKey(projectId, weekStart) {
    return `${projectId}|${weekStart}`;
  }

  function activeProject() {
    return (
      state.projects.find((project) => project.id === state.selectedProjectId) ||
      state.projects[0] ||
      null
    );
  }

  function projectBehaviors(projectId = state.selectedProjectId) {
    return state.behaviors.filter((behavior) => behavior.projectId === projectId && behavior.active !== false);
  }

  function tasksForDate(date = state.selectedDate, projectId = state.selectedProjectId) {
    return state.tasks.filter((task) => task.date === date && task.projectId === projectId);
  }

  function isBehaviorDue(behavior, dateISO) {
    const day = fromISO(dateISO).getDay();
    if (behavior.frequency === "weekdays") return day >= 1 && day <= 5;
    if (behavior.frequency === "weekends") return day === 0 || day === 6;
    if (behavior.frequency === "mon_wed_fri") return day === 1 || day === 3 || day === 5;
    if (behavior.frequency === "weekly_review") return day === 0;
    return true;
  }

  function dueBehaviors(date = state.selectedDate, projectId = state.selectedProjectId) {
    return projectBehaviors(projectId).filter((behavior) => isBehaviorDue(behavior, date));
  }

  function getLog(behaviorId, date = state.selectedDate) {
    return state.logs[logKey(behaviorId, date)] || null;
  }

  function setLog(behaviorId, date, patch, shouldRender = true) {
    const key = logKey(behaviorId, date);
    const behavior = state.behaviors.find((item) => item.id === behaviorId);
    const current = state.logs[key] || {
      behaviorId,
      date,
      status: "partial",
      value: 0,
      qualityScore: 3,
      failureReason: "",
      note: "",
    };
    state.logs[key] = { ...current, ...patch };
    if (behavior && state.logs[key].status === "done" && !Number(state.logs[key].value)) {
      state.logs[key].value = behavior.targetValue;
    }
    saveState();
    if (shouldRender) render();
  }

  function completionForBehavior(behavior, log) {
    if (!log) return { earned: 0, possible: behavior.weight, percent: 0 };
    if (log.status === "skipped") return { earned: 0, possible: 0, percent: null };
    if (log.status === "missed") return { earned: 0, possible: behavior.weight, percent: 0 };
    if (behavior.type === "binary" || behavior.type === "avoidance") {
      const percent = log.status === "done" ? 100 : 50;
      return { earned: behavior.weight * (percent / 100), possible: behavior.weight, percent };
    }
    const target = Number(behavior.targetValue) || 1;
    const value = Math.max(0, Number(log.value) || 0);
    const ratio = Math.min(value / target, 1);
    const percent = Math.round(ratio * 100);
    return { earned: behavior.weight * ratio, possible: behavior.weight, percent };
  }

  function scoreItems(date = state.selectedDate, projectId = state.selectedProjectId) {
    const behaviorItems = dueBehaviors(date, projectId).map((behavior) => {
      const log = getLog(behavior.id, date);
      const completion = completionForBehavior(behavior, log);
      return {
        id: behavior.id,
        title: behavior.title,
        kind: "behavior",
        isNonNegotiable: behavior.isNonNegotiable,
        ...completion,
      };
    });
    const taskItems = tasksForDate(date, projectId).map((task) => ({
      id: task.id,
      title: task.title,
      kind: "task",
      isNonNegotiable: false,
      earned: task.done ? 1 : 0,
      possible: 1,
      percent: task.done ? 100 : 0,
    }));
    return [...behaviorItems, ...taskItems];
  }

  function dayScore(date = state.selectedDate, projectId = state.selectedProjectId) {
    const items = scoreItems(date, projectId);
    const possible = items.reduce((sum, item) => sum + item.possible, 0);
    if (!possible) return null;
    const earned = items.reduce((sum, item) => sum + item.earned, 0);
    return Math.round((earned / possible) * 100);
  }

  function scoreColor(score) {
    if (score === null || score === undefined) return "#b9b2a4";
    if (score >= 85) return "var(--green)";
    if (score >= 70) return "var(--blue)";
    if (score >= 50) return "var(--yellow)";
    return "var(--coral)";
  }

  function scoreLabel(score) {
    if (score === null || score === undefined) return "Sem plano";
    if (score >= 85) return "Dia forte";
    if (score >= 70) return "Consistente";
    if (score >= 50) return "Vulnerável";
    return "Revisar método";
  }

  function rangeDates(endISO, amount) {
    const dates = [];
    for (let offset = amount - 1; offset >= 0; offset -= 1) {
      dates.push(addDays(endISO, -offset));
    }
    return dates;
  }

  function average(values) {
    const valid = values.filter((value) => Number.isFinite(value));
    if (!valid.length) return null;
    return Math.round(valid.reduce((sum, value) => sum + value, 0) / valid.length);
  }

  function projectStats(projectId = state.selectedProjectId, endDate = todayISO()) {
    const last30 = rangeDates(endDate, 30);
    const scores = last30.map((date) => dayScore(date, projectId)).filter((score) => score !== null);
    const weekDates = rangeDates(endDate, 7);
    const weekScores = weekDates.map((date) => dayScore(date, projectId));
    const behaviors = projectBehaviors(projectId);
    const nonNegotiable = behaviors.filter((behavior) => behavior.isNonNegotiable);
    let nonNegotiableDone = 0;
    let nonNegotiablePossible = 0;
    last30.forEach((date) => {
      nonNegotiable.forEach((behavior) => {
        if (!isBehaviorDue(behavior, date)) return;
        const completion = completionForBehavior(behavior, getLog(behavior.id, date));
        if (completion.possible === 0) return;
        nonNegotiablePossible += 1;
        if (completion.percent >= 100) nonNegotiableDone += 1;
      });
    });

    const behaviorAverages = behaviors.map((behavior) => {
      const values = last30
        .filter((date) => isBehaviorDue(behavior, date))
        .map((date) => completionForBehavior(behavior, getLog(behavior.id, date)).percent)
        .filter((percent) => percent !== null);
      return {
        behavior,
        avg: average(values) ?? 0,
      };
    });

    const failureCounts = {};
    Object.values(state.logs).forEach((log) => {
      const behavior = behaviors.find((item) => item.id === log.behaviorId);
      if (!behavior) return;
      if (!last30.includes(log.date)) return;
      if (log.failureReason) {
        failureCounts[log.failureReason] = (failureCounts[log.failureReason] || 0) + 1;
      }
    });
    const mainFailure = Object.entries(failureCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "Sem padrão claro";
    const energyValues = last30
      .map((date) => state.checkins[date]?.energyScore)
      .filter((value) => Number.isFinite(Number(value)))
      .map(Number);

    return {
      last30,
      weekDates,
      scores,
      weekScores,
      average30: average(scores),
      averageWeek: average(weekScores.filter((score) => score !== null)),
      days85: scores.filter((score) => score >= 85).length,
      bestStreak: bestStreak(projectId, endDate),
      nonNegotiableConsistency: nonNegotiablePossible
        ? Math.round((nonNegotiableDone / nonNegotiablePossible) * 100)
        : null,
      behaviorAverages,
      weakestBehavior: behaviorAverages.slice().sort((a, b) => a.avg - b.avg)[0],
      strongestBehavior: behaviorAverages.slice().sort((a, b) => b.avg - a.avg)[0],
      mainFailure,
      energyAverage: average(energyValues),
    };
  }

  function bestStreak(projectId, endDate) {
    let current = 0;
    let best = 0;
    rangeDates(endDate, 90).forEach((date) => {
      const score = dayScore(date, projectId);
      if (score !== null && score >= 85) {
        current += 1;
        best = Math.max(best, current);
      } else if (score !== null) {
        current = 0;
      }
    });
    return best;
  }

  function sixMScore(project, stats) {
    const behaviorCount = projectBehaviors(project.id).length;
    return [
      {
        label: "Meta",
        score: project.title && project.successCriteria && project.deadline ? 9 : 5,
        note: "Clareza de destino, prazo e critério.",
      },
      {
        label: "Motivação",
        score: project.motivation?.why && project.motivation?.costOfInaction ? 8 : 4,
        note: "Força do motivo visível no dia ruim.",
      },
      {
        label: "Método",
        score: project.method?.description && behaviorCount >= 3 ? 8 : 5,
        note: "Plano quebrado em ações treináveis.",
      },
      {
        label: "Disciplina",
        score: Math.max(1, Math.round((stats.average30 || 0) / 10)),
        note: "Execução real dos compromissos.",
      },
      {
        label: "Métricas",
        score: stats.scores.length >= 10 ? 8 : Math.max(3, stats.scores.length),
        note: "Quantidade de dias com evidência.",
      },
      {
        label: "Mentor",
        score: project.mentor ? 7 : 3,
        note: "Acompanhamento externo ainda opcional.",
      },
    ];
  }

  function render() {
    const view = VIEWS[state.activeView] ? state.activeView : "today";
    state.activeView = view;
    app.innerHTML = `
      ${renderSidebar()}
      <main class="main">
        ${renderTopbar()}
        <section class="view-root">${renderView(view)}</section>
      </main>
    `;
  }

  function renderSidebar() {
    const nav = Object.entries(VIEWS)
      .map(([key, view]) => {
        const active = key === state.activeView ? "active" : "";
        return `
          <button class="nav-button ${active}" type="button" data-view="${key}">
            <span class="nav-icon">${view.icon}</span>
            <span>${view.nav}</span>
          </button>
        `;
      })
      .join("");
    return `
      <aside class="sidebar">
        <div class="brand">
          <div class="brand-mark">1%</div>
          <div>
            <p class="brand-title">Rota 1%</p>
            <p class="brand-subtitle">Indicadores de performance</p>
          </div>
        </div>
        <nav class="nav" aria-label="Principal">${nav}</nav>
        <div class="sidebar-card">
          <strong>Método antes de culpa</strong>
          <p>Um dia fraco não define você. Ele mostra onde o plano precisa ficar mais claro, menor ou melhor protegido.</p>
        </div>
      </aside>
    `;
  }

  function renderTopbar() {
    const view = VIEWS[state.activeView];
    return `
      <header class="topbar">
        <div>
          <h1>${view.title}</h1>
          <p>${view.subtitle}</p>
        </div>
        <div class="topbar-actions">
          <button class="button ghost" type="button" data-date-shift="-1" title="Dia anterior">Dia -</button>
          <button class="button ghost" type="button" data-date-today>Hoje</button>
          <button class="button ghost" type="button" data-date-shift="1" title="Próximo dia">Dia +</button>
          <button class="button" type="button" data-export>Exportar</button>
          <button class="button primary" type="button" data-open-project-modal>Novo projeto</button>
        </div>
      </header>
    `;
  }

  function renderView(view) {
    if (!activeProject()) {
      return `<div class="empty">Crie seu primeiro projeto de treino para começar.</div>`;
    }
    if (view === "calendar") return renderCalendarView();
    if (view === "projects") return renderProjectsView();
    if (view === "dashboard") return renderDashboardView();
    if (view === "review") return renderReviewView();
    return renderTodayView();
  }

  function renderTodayView() {
    const project = activeProject();
    const score = dayScore(state.selectedDate, project.id);
    const behaviors = dueBehaviors(state.selectedDate, project.id);
    const stats = projectStats(project.id, state.selectedDate);
    return `
      <section class="panel today-hero">
        <div class="project-focus">
          <p class="eyebrow">${formatDate(state.selectedDate, { weekday: "long", month: "long", year: "numeric" })}</p>
          <h2>${escapeHtml(project.title)}</h2>
          <div class="badge-row">
            <span class="badge blue">${escapeHtml(project.area)}</span>
            <span class="badge green">${escapeHtml(project.successCriteria)}</span>
            <span class="badge">Prazo: ${formatDate(project.deadline, { weekday: undefined })}</span>
          </div>
          <p class="quote">${escapeHtml(project.motivation?.commitmentPhrase || project.motivation?.why || "Mantenha a meta visível e execute o método.")}</p>
        </div>
        ${renderScoreRing(score)}
      </section>

      <div class="grid two">
        <div class="grid">
          <section class="panel">
            <div class="panel-header">
              <div>
                <p class="eyebrow">Input do dia</p>
                <h2>Comportamentos rastreáveis</h2>
                <p>Marque o que foi executado. O resultado vem depois; hoje medimos o método.</p>
              </div>
              <span class="badge ${score >= 85 ? "green" : score < 50 ? "coral" : "blue"}">${scoreLabel(score)}</span>
            </div>
            <div class="behavior-list">
              ${behaviors.length ? behaviors.map(renderBehaviorItem).join("") : `<div class="empty">Nenhum comportamento previsto para este dia.</div>`}
            </div>
          </section>

          ${renderTasksPanel()}
          ${renderCheckinPanel()}
        </div>

        <aside class="grid">
          ${renderDayDiagnosis(project, stats)}
          ${renderWeekPulse(project.id)}
        </aside>
      </div>
    `;
  }

  function renderScoreRing(score) {
    const display = score === null || score === undefined ? "--" : score;
    const numeric = score || 0;
    return `
      <div class="score-ring" style="--score:${numeric}; --score-color:${scoreColor(score)}">
        <div>
          <strong>${display}</strong>
          <span>${score === null || score === undefined ? "sem plano" : "score"}</span>
        </div>
      </div>
    `;
  }

  function renderBehaviorItem(behavior) {
    const log = getLog(behavior.id, state.selectedDate);
    const completion = completionForBehavior(behavior, log);
    const value = log?.value ?? "";
    const status = log?.status || "pending";
    const input =
      behavior.type === "binary" || behavior.type === "avoidance"
        ? ""
        : `<input class="small-input" type="number" min="0" value="${escapeHtml(value)}" data-log-value="${behavior.id}" aria-label="Valor de ${escapeHtml(behavior.title)}" />`;
    return `
      <article class="behavior-item">
        <div class="behavior-main">
          <h3>${escapeHtml(behavior.title)}</h3>
          <p>
            Meta: ${escapeHtml(behavior.targetValue)} ${escapeHtml(behavior.unit)}
            · Peso ${escapeHtml(behavior.weight)}
            · ${escapeHtml(behavior.area)}
          </p>
          <div class="badge-row" style="margin-top: 9px;">
            ${behavior.isNonNegotiable ? `<span class="badge coral">Não negociável</span>` : ""}
            <span class="badge">${escapeHtml(behavior.frequency || "daily")}</span>
            <span class="badge blue">${completion.percent === null ? "Pulado" : `${completion.percent}%`}</span>
          </div>
        </div>
        <div class="behavior-controls">
          ${input}
          <div class="control-row">
            ${statusButton(behavior.id, "done", "Feito", status)}
            ${statusButton(behavior.id, "partial", "Parcial", status)}
            ${statusButton(behavior.id, "missed", "Falhou", status)}
            ${statusButton(behavior.id, "skipped", "Pular", status)}
          </div>
          <div class="control-row">
            <select data-log-failure="${behavior.id}" aria-label="Causa de falha">
              <option value="">Causa / ajuste</option>
              ${FAILURE_REASONS.map(
                (reason) => `<option value="${escapeHtml(reason)}" ${log?.failureReason === reason ? "selected" : ""}>${escapeHtml(reason)}</option>`,
              ).join("")}
            </select>
            <select data-log-quality="${behavior.id}" aria-label="Qualidade">
              ${[1, 2, 3, 4, 5]
                .map((item) => `<option value="${item}" ${Number(log?.qualityScore || 3) === item ? "selected" : ""}>Q${item}</option>`)
                .join("")}
            </select>
          </div>
          <input class="small-input" value="${escapeHtml(log?.note || "")}" data-log-note="${behavior.id}" placeholder="Nota rápida" />
        </div>
      </article>
    `;
  }

  function statusButton(behaviorId, status, label, currentStatus) {
    const active = currentStatus === status ? `active ${status}` : "";
    return `<button class="status-button ${active}" type="button" data-log-status="${behaviorId}" data-status="${status}">${label}</button>`;
  }

  function renderTasksPanel() {
    const tasks = tasksForDate();
    return `
      <section class="panel">
        <div class="panel-header">
          <div>
            <p class="eyebrow">Planejação</p>
            <h2>Tarefas variáveis do dia</h2>
            <p>O fixo treina constância. O variável organiza a realidade de hoje.</p>
          </div>
        </div>
        <div class="task-composer">
          <input id="task-title" placeholder="Nova tarefa variável" />
          <select id="task-quadrant" aria-label="Quadrante">
            ${Object.entries(QUADRANTS)
              .map(([key, label]) => `<option value="${key}">${label}</option>`)
              .join("")}
          </select>
          <button class="button" type="button" data-add-task>Adicionar</button>
        </div>
        <div class="task-list">
          ${tasks.length ? tasks.map(renderTaskItem).join("") : `<div class="empty">Nenhuma tarefa variável criada para este dia.</div>`}
        </div>
      </section>
    `;
  }

  function renderTaskItem(task) {
    return `
      <article class="task-item ${task.done ? "done" : ""}">
        <div>
          <h3>${escapeHtml(task.title)}</h3>
          <span class="quadrant">${escapeHtml(QUADRANTS[task.quadrant] || "Sem quadrante")}</span>
        </div>
        <div class="inline-row">
          <button class="status-button ${task.done ? "active done" : ""}" type="button" data-toggle-task="${task.id}">
            ${task.done ? "Feita" : "Marcar"}
          </button>
          <button class="icon-button" type="button" data-delete-task="${task.id}" aria-label="Excluir tarefa">×</button>
        </div>
      </article>
    `;
  }

  function renderCheckinPanel() {
    const checkin = state.checkins[state.selectedDate] || {};
    return `
      <section class="panel">
        <div class="panel-header">
          <div>
            <p class="eyebrow">Fechamento</p>
            <h2>Check-in do método</h2>
            <p>Feche o dia com uma leitura fria: comportamento, energia, obstáculo e ajuste.</p>
          </div>
        </div>
        <div class="checkin-grid">
          ${rangeInput("energyScore", "Energia", checkin.energyScore || 3)}
          ${rangeInput("clarityScore", "Clareza", checkin.clarityScore || 3)}
          ${rangeInput("focusScore", "Foco", checkin.focusScore || 3)}
          <label class="wide">
            Principal obstáculo
            <select id="checkin-mainObstacle">
              <option value="">Selecione</option>
              ${FAILURE_REASONS.map(
                (reason) => `<option value="${escapeHtml(reason)}" ${checkin.mainObstacle === reason ? "selected" : ""}>${escapeHtml(reason)}</option>`,
              ).join("")}
            </select>
          </label>
          <label>
            Microvitória
            <textarea id="checkin-microWin" rows="3" placeholder="O 1% de hoje">${escapeHtml(checkin.microWin || "")}</textarea>
          </label>
          <label>
            Ajuste para amanhã
            <textarea id="checkin-adjustment" rows="3" placeholder="O que muda no método?">${escapeHtml(checkin.adjustmentForTomorrow || "")}</textarea>
          </label>
          <label>
            Nota livre
            <textarea id="checkin-note" rows="3" placeholder="Observação">${escapeHtml(checkin.note || "")}</textarea>
          </label>
        </div>
        <div class="inline-row" style="justify-content: flex-end; margin-top: 14px;">
          <button class="button primary" type="button" data-save-checkin>Fechar dia</button>
        </div>
      </section>
    `;
  }

  function rangeInput(idName, label, value) {
    return `
      <label>
        ${label}: <span>${value}</span>
        <input id="checkin-${idName}" type="range" min="1" max="5" value="${value}" />
      </label>
    `;
  }

  function renderDayDiagnosis(project, stats) {
    const score = dayScore(state.selectedDate, project.id);
    const insight = dayInsight(state.selectedDate, project.id);
    return `
      <section class="panel">
        <div class="panel-header">
          <div>
            <p class="eyebrow">Diagnóstico</p>
            <h2>Leitura do dia</h2>
          </div>
          <span class="badge ${score >= 85 ? "green" : score < 50 ? "coral" : "blue"}">${scoreLabel(score)}</span>
        </div>
        <p>${escapeHtml(insight)}</p>
        <div class="progress-list" style="margin-top: 15px;">
          <div class="progress-row">
            <div class="progress-label"><span>Média 7 dias</span><strong>${stats.averageWeek ?? "--"}%</strong></div>
            ${bar(stats.averageWeek || 0, scoreColor(stats.averageWeek))}
          </div>
          <div class="progress-row">
            <div class="progress-label"><span>Não negociáveis</span><strong>${stats.nonNegotiableConsistency ?? "--"}%</strong></div>
            ${bar(stats.nonNegotiableConsistency || 0, "var(--coral)")}
          </div>
          <div class="progress-row">
            <div class="progress-label"><span>Energia média</span><strong>${stats.energyAverage ?? "--"}/5</strong></div>
            ${bar(((stats.energyAverage || 0) / 5) * 100, "var(--indigo)")}
          </div>
        </div>
      </section>
    `;
  }

  function dayInsight(date, projectId) {
    const score = dayScore(date, projectId);
    const checkin = state.checkins[date];
    const missed = dueBehaviors(date, projectId).filter((behavior) => {
      const log = getLog(behavior.id, date);
      return !log || log.status === "missed";
    });
    if (score === null) return "Sem plano para este dia. Crie comportamentos ou tarefas para gerar evidência.";
    if (score >= 85) return "O método ficou forte hoje. Registre o que tornou a execução possível para repetir o padrão.";
    if (missed.some((behavior) => behavior.isNonNegotiable)) {
      return "Um não negociável ficou sem execução. Antes de aumentar a meta, proteja horário, ambiente e energia.";
    }
    if (checkin?.mainObstacle) {
      return `O principal sinal do dia foi ${checkin.mainObstacle.toLowerCase()}. Ajuste o método, não abandone a meta.`;
    }
    return "O score pede revisão. Identifique se a falha veio do planejamento, do ambiente ou de uma tarefa grande demais.";
  }

  function renderWeekPulse(projectId) {
    const weekStart = startOfWeek(state.selectedDate);
    const dates = rangeDates(addDays(weekStart, 6), 7);
    return `
      <section class="panel">
        <div class="panel-header">
          <div>
            <p class="eyebrow">Semana</p>
            <h2>Pulso de execução</h2>
          </div>
        </div>
        <div class="progress-list">
          ${dates
            .map((date) => {
              const score = dayScore(date, projectId);
              return `
                <div class="progress-row">
                  <div class="progress-label">
                    <span>${formatDate(date, { weekday: "short" })}</span>
                    <strong>${score === null ? "--" : `${score}%`}</strong>
                  </div>
                  ${bar(score || 0, scoreColor(score))}
                </div>
              `;
            })
            .join("")}
        </div>
      </section>
    `;
  }

  function bar(value, color = "var(--blue)") {
    const width = Math.max(0, Math.min(100, Math.round(value)));
    return `<div class="bar"><span style="width:${width}%; background:${color};"></span></div>`;
  }

  function renderCalendarView() {
    const project = activeProject();
    const monthStart = startOfMonth(state.calendarCursor);
    const first = fromISO(monthStart);
    const firstDay = first.getDay();
    const offset = firstDay === 0 ? -6 : 1 - firstDay;
    const gridStart = addDays(monthStart, offset);
    const dates = rangeDates(addDays(gridStart, 41), 42);
    const selected = state.selectedDate;
    return `
      <div class="calendar-shell">
        <section class="panel">
          <div class="calendar-toolbar">
            <div class="inline-row">
              <button class="icon-button" type="button" data-calendar-shift="-1" aria-label="Mês anterior">‹</button>
              <h2>${formatMonth(state.calendarCursor)}</h2>
              <button class="icon-button" type="button" data-calendar-shift="1" aria-label="Próximo mês">›</button>
            </div>
            <div class="segmented" aria-label="Legenda">
              <button class="active" type="button">Mês</button>
              <button type="button" data-view="today">Hoje</button>
              <button type="button" data-view="dashboard">Dados</button>
            </div>
          </div>
          <div class="calendar-grid">
            ${["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day) => `<div class="weekday">${day}</div>`).join("")}
            ${dates.map((date) => renderDayCell(date, monthStart, selected, project.id)).join("")}
          </div>
        </section>
        ${renderSelectedDayDetail(project.id)}
      </div>
    `;
  }

  function renderDayCell(date, monthStart, selected, projectId) {
    const score = dayScore(date, projectId);
    const month = fromISO(date).getMonth();
    const currentMonth = fromISO(monthStart).getMonth();
    const checkin = state.checkins[date];
    const behaviorsDone = dueBehaviors(date, projectId).filter((behavior) => {
      const log = getLog(behavior.id, date);
      return log?.status === "done";
    }).length;
    const tasksDone = tasksForDate(date, projectId).filter((task) => task.done).length;
    return `
      <button class="day-cell ${month !== currentMonth ? "outside" : ""} ${date === selected ? "selected" : ""}" type="button" data-select-date="${date}">
        <div class="day-number">
          <span>${fromISO(date).getDate()}</span>
          ${score === null ? "" : `<span class="day-score" style="background:${scoreColor(score)}">${score}%</span>`}
        </div>
        <p class="day-note">${escapeHtml(checkin?.microWin || scoreLabel(score))}</p>
        <div class="day-dots">
          ${behaviorsDone ? `<span class="dot green"></span>` : ""}
          ${tasksDone ? `<span class="dot blue"></span>` : ""}
          ${checkin ? `<span class="dot coral"></span>` : ""}
        </div>
      </button>
    `;
  }

  function renderSelectedDayDetail(projectId) {
    const date = state.selectedDate;
    const score = dayScore(date, projectId);
    const behaviors = dueBehaviors(date, projectId);
    const checkin = state.checkins[date];
    const tasks = tasksForDate(date, projectId);
    return `
      <aside class="panel day-detail">
        <div class="panel-header">
          <div>
            <p class="eyebrow">Dia selecionado</p>
            <h2>${formatDate(date, { weekday: "long", month: "long", year: "numeric" })}</h2>
          </div>
          ${renderScoreRing(score)}
        </div>
        <div class="review-list">
          ${behaviors
            .map((behavior) => {
              const log = getLog(behavior.id, date);
              const completion = completionForBehavior(behavior, log);
              return `
                <div class="progress-row">
                  <div class="progress-label">
                    <span>${escapeHtml(behavior.title)}</span>
                    <strong>${completion.percent === null ? "pulado" : `${completion.percent}%`}</strong>
                  </div>
                  ${bar(completion.percent || 0, scoreColor(completion.percent))}
                </div>
              `;
            })
            .join("")}
          ${tasks
            .map(
              (task) => `
                <div class="task-item ${task.done ? "done" : ""}">
                  <div>
                    <h3>${escapeHtml(task.title)}</h3>
                    <span class="quadrant">${escapeHtml(QUADRANTS[task.quadrant])}</span>
                  </div>
                  <span class="badge ${task.done ? "green" : ""}">${task.done ? "Feita" : "Pendente"}</span>
                </div>
              `,
            )
            .join("")}
          <div class="insight-card">
            <strong>Microvitória</strong>
            <p>${escapeHtml(checkin?.microWin || "Ainda sem microvitória registrada.")}</p>
          </div>
          <div class="insight-card">
            <strong>Ajuste</strong>
            <p>${escapeHtml(checkin?.adjustmentForTomorrow || dayInsight(date, projectId))}</p>
          </div>
        </div>
      </aside>
    `;
  }

  function renderDashboardView() {
    const project = activeProject();
    const stats = projectStats(project.id);
    const sixM = sixMScore(project, stats);
    return `
      <div class="grid four">
        ${metric("Média 30 dias", stats.average30 === null ? "--" : `${stats.average30}%`, "Execução geral do método.")}
        ${metric("Dias 85%+", stats.days85, "Dias fortes no último ciclo.")}
        ${metric("Não negociáveis", stats.nonNegotiableConsistency === null ? "--" : `${stats.nonNegotiableConsistency}%`, "Consistência do que não pode flexibilizar.")}
        ${metric("Melhor sequência", `${stats.bestStreak}d`, "Sequência de dias fortes.")}
      </div>

      <div class="grid two">
        <section class="panel">
          <div class="panel-header">
            <div>
              <p class="eyebrow">Tendência</p>
              <h2>Últimos 7 dias</h2>
            </div>
          </div>
          <div class="progress-list">
            ${stats.weekDates
              .map((date, index) => {
                const score = stats.weekScores[index];
                return `
                  <div class="progress-row">
                    <div class="progress-label">
                      <span>${formatDate(date, { weekday: "short" })}</span>
                      <strong>${score === null ? "--" : `${score}%`}</strong>
                    </div>
                    ${bar(score || 0, scoreColor(score))}
                  </div>
                `;
              })
              .join("")}
          </div>
        </section>

        <section class="panel">
          <div class="panel-header">
            <div>
              <p class="eyebrow">Comportamentos</p>
              <h2>Consistência por indicador</h2>
            </div>
          </div>
          <div class="progress-list">
            ${stats.behaviorAverages
              .map(
                ({ behavior, avg }) => `
                  <div class="progress-row">
                    <div class="progress-label">
                      <span>${escapeHtml(behavior.title)}</span>
                      <strong>${avg}%</strong>
                    </div>
                    ${bar(avg, scoreColor(avg))}
                  </div>
                `,
              )
              .join("")}
          </div>
        </section>
      </div>

      <div class="grid two">
        <section class="panel">
          <div class="panel-header">
            <div>
              <p class="eyebrow">6Ms</p>
              <h2>Radar metodológico</h2>
              <p>O problema nem sempre é disciplina. Às vezes é meta vaga, método pesado ou falta de métrica.</p>
            </div>
          </div>
          <div class="method-grid">
            ${sixM
              .map(
                (item) => `
                  <div class="method-cell">
                    <strong>${escapeHtml(item.label)} · ${item.score}/10</strong>
                    ${bar(item.score * 10, scoreColor(item.score * 10))}
                    <p style="margin-top: 8px;">${escapeHtml(item.note)}</p>
                  </div>
                `,
              )
              .join("")}
          </div>
        </section>

        <section class="panel">
          <div class="panel-header">
            <div>
              <p class="eyebrow">Mapa de calor</p>
              <h2>90 dias de evidência</h2>
            </div>
          </div>
          <div class="heatmap">
            ${rangeDates(todayISO(), 90)
              .map((date) => {
                const score = dayScore(date, project.id);
                return `<button class="heatmap-cell" title="${date}: ${score ?? "--"}%" type="button" data-select-date="${date}" data-view-after-date="calendar" style="background:${scoreColor(score)}"></button>`;
              })
              .join("")}
          </div>
        </section>
      </div>

      <section class="panel">
        <div class="panel-header">
          <div>
            <p class="eyebrow">Insights</p>
            <h2>Leituras acionáveis</h2>
          </div>
        </div>
        <div class="insight-grid">
          ${dashboardInsights(stats).map((item) => `<div class="insight-card"><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.text)}</p></div>`).join("")}
        </div>
      </section>
    `;
  }

  function metric(label, value, text) {
    const displayValue = String(value ?? "--");
    const textual = displayValue.length > 10 && !/^[\d%.,/ -]+$/.test(displayValue);
    return `
      <div class="metric-card">
        <span>${escapeHtml(label)}</span>
        <strong class="${textual ? "textual" : ""}">${escapeHtml(displayValue)}</strong>
        <p>${escapeHtml(text)}</p>
      </div>
    `;
  }

  function dashboardInsights(stats) {
    const insights = [];
    if (stats.weakestBehavior) {
      insights.push({
        title: "Indicador mais frágil",
        text: `${stats.weakestBehavior.behavior.title} está em ${stats.weakestBehavior.avg}%. Antes de aumentar a meta, reduza a fricção desse comportamento.`,
      });
    }
    if (stats.strongestBehavior) {
      insights.push({
        title: "Indicador mais forte",
        text: `${stats.strongestBehavior.behavior.title} é o comportamento mais estável. Use o mesmo horário, ambiente ou gatilho para os hábitos fracos.`,
      });
    }
    insights.push({
      title: "Causa recorrente",
      text: `O padrão de falha mais visível é: ${stats.mainFailure}. Isso aponta para ajuste de método, não para desistência.`,
    });
    if ((stats.average30 || 0) < 70) {
      insights.push({
        title: "Plano pesado",
        text: "A média está abaixo de 70%. Considere reduzir o número de itens diários e proteger apenas os não negociáveis por uma semana.",
      });
    } else {
      insights.push({
        title: "Método em movimento",
        text: "A média indica que existe tração. O próximo ganho vem de melhorar qualidade e não apenas volume.",
      });
    }
    return insights;
  }

  function renderProjectsView() {
    const project = activeProject();
    return `
      <section class="panel">
        <div class="panel-header">
          <div>
            <p class="eyebrow">Portfólio pessoal</p>
            <h2>Metas transformadas em treino</h2>
          </div>
          <button class="button primary" type="button" data-open-project-modal>Novo projeto</button>
        </div>
        <div class="project-list">
          ${state.projects.map(renderProjectCard).join("")}
        </div>
      </section>
      ${project ? renderProjectDetail(project) : ""}
    `;
  }

  function renderProjectCard(project) {
    const score = projectStats(project.id).average30;
    const active = project.id === state.selectedProjectId ? "active" : "";
    const pendingDelete = state.pendingDeleteProjectId === project.id;
    const deleteControls =
      state.projects.length > 1
        ? pendingDelete
          ? `
            <button class="button danger" type="button" data-confirm-delete-project="${project.id}">Confirmar</button>
            <button class="button ghost" type="button" data-cancel-delete-project>Cancelar</button>
          `
          : `<button class="button danger" type="button" data-delete-project="${project.id}">Excluir</button>`
        : "";
    return `
      <article class="project-card ${active}">
        <div>
          <h3>${escapeHtml(project.title)}</h3>
          <p>${escapeHtml(project.successCriteria)}</p>
        </div>
        <div class="project-meta">
          <span class="badge blue">${escapeHtml(project.area)}</span>
          <span class="badge">${formatDate(project.deadline, { weekday: undefined })}</span>
          <span class="badge ${score >= 85 ? "green" : score < 50 ? "coral" : ""}">${score ?? "--"}%</span>
        </div>
        ${bar(score || 0, scoreColor(score))}
        <div class="inline-row" style="justify-content: space-between;">
          <button class="button ghost" type="button" data-select-project="${project.id}">Abrir</button>
          <span class="inline-row">${deleteControls}</span>
        </div>
      </article>
    `;
  }

  function renderProjectDetail(project) {
    const stats = projectStats(project.id);
    const sixM = sixMScore(project, stats);
    return `
      <div class="grid two">
        <section class="panel">
          <div class="panel-header">
            <div>
              <p class="eyebrow">Método</p>
              <h2>${escapeHtml(project.title)}</h2>
              <p>${escapeHtml(project.method?.description || "Descreva o método que sustenta esta meta.")}</p>
            </div>
          </div>
          <div class="method-grid">
            ${sixM
              .map(
                (item) => `
                  <div class="method-cell">
                    <strong>${escapeHtml(item.label)}</strong>
                    ${bar(item.score * 10, scoreColor(item.score * 10))}
                    <p>${escapeHtml(item.note)}</p>
                  </div>
                `,
              )
              .join("")}
          </div>
        </section>

        <section class="panel">
          <div class="panel-header">
            <div>
              <p class="eyebrow">Motivação</p>
              <h2>Por que continuar?</h2>
            </div>
          </div>
          <div class="review-list">
            <div class="insight-card"><strong>Motivo</strong><p>${escapeHtml(project.motivation?.why)}</p></div>
            <div class="insight-card"><strong>Custo de não agir</strong><p>${escapeHtml(project.motivation?.costOfInaction)}</p></div>
            <div class="insight-card"><strong>Compromisso</strong><p>${escapeHtml(project.motivation?.commitmentPhrase)}</p></div>
          </div>
        </section>
      </div>

      <div class="grid two">
        <section class="panel">
          <div class="panel-header">
            <div>
              <p class="eyebrow">Movimentos</p>
              <h2>Do estado atual ao resultado</h2>
            </div>
          </div>
          <div class="timeline">
            ${(project.movements || [])
              .map(
                (movement, index) => `
                  <div class="timeline-item">
                    <div class="timeline-number">${index + 1}</div>
                    <div>
                      <strong>${escapeHtml(movement.title)}</strong>
                      <p>${escapeHtml(movement.description)}</p>
                    </div>
                  </div>
                `,
              )
              .join("")}
          </div>
        </section>

        <section class="panel">
          <div class="panel-header">
            <div>
              <p class="eyebrow">Indicadores</p>
              <h2>Comportamentos ativos</h2>
            </div>
          </div>
          <div class="progress-list">
            ${projectBehaviors(project.id)
              .map((behavior) => {
                const avg = stats.behaviorAverages.find((item) => item.behavior.id === behavior.id)?.avg || 0;
                return `
                  <div class="progress-row">
                    <div class="progress-label">
                      <span>${escapeHtml(behavior.title)}</span>
                      <strong>${avg}%</strong>
                    </div>
                    ${bar(avg, scoreColor(avg))}
                  </div>
                `;
              })
              .join("")}
          </div>
        </section>
      </div>

      <section class="panel">
        <div class="panel-header">
          <div>
            <p class="eyebrow">Novo indicador</p>
            <h2>Adicionar comportamento rastreável</h2>
            <p>Use isso com parcimônia. Melhor três bons indicadores do que quinze promessas frágeis.</p>
          </div>
        </div>
        <div class="task-composer">
          <input id="new-behavior-title" placeholder="Ex: Prospectar 30 minutos" />
          <select id="new-behavior-type" aria-label="Tipo">
            <option value="binary">Fez ou não fez</option>
            <option value="numeric">Numérico</option>
            <option value="duration">Duração</option>
          </select>
          <button class="button" type="button" data-add-behavior>Adicionar</button>
        </div>
      </section>
    `;
  }

  function renderReviewView() {
    const project = activeProject();
    const weekStart = startOfWeek(state.selectedDate);
    const weekEnd = addDays(weekStart, 6);
    const key = reviewKey(project.id, weekStart);
    const review = state.reviews[key] || {};
    const dates = rangeDates(weekEnd, 7);
    const scores = dates.map((date) => dayScore(date, project.id));
    const avg = average(scores.filter((score) => score !== null));
    const stats = projectStats(project.id, weekEnd);
    return `
      <section class="panel">
        <div class="panel-header">
          <div>
            <p class="eyebrow">Semana ${formatDate(weekStart, { weekday: undefined })} - ${formatDate(weekEnd, { weekday: undefined })}</p>
            <h2>Revisão do método</h2>
            <p>A revisão impede que os dados virem enfeite. Aqui você decide o que manter, cortar ou ajustar.</p>
          </div>
          <span class="badge ${avg >= 85 ? "green" : avg < 50 ? "coral" : "blue"}">${avg ?? "--"}%</span>
        </div>
        <div class="grid three">
          ${metric("Média semanal", avg === null ? "--" : `${avg}%`, "Score do método nesta semana.")}
          ${metric("Melhor indicador", stats.strongestBehavior?.behavior.title || "--", "Comportamento mais confiável.")}
          ${metric("Ponto frágil", stats.weakestBehavior?.behavior.title || "--", "Primeiro candidato a ajuste.")}
        </div>
      </section>

      <div class="grid two">
        <section class="panel">
          <div class="panel-header">
            <div>
              <p class="eyebrow">Evidência</p>
              <h2>Dias da semana</h2>
            </div>
          </div>
          <div class="progress-list">
            ${dates
              .map((date) => {
                const score = dayScore(date, project.id);
                return `
                  <div class="progress-row">
                    <div class="progress-label">
                      <span>${formatDate(date, { weekday: "long" })}</span>
                      <strong>${score === null ? "--" : `${score}%`}</strong>
                    </div>
                    ${bar(score || 0, scoreColor(score))}
                  </div>
                `;
              })
              .join("")}
          </div>
        </section>

        <section class="panel">
          <div class="panel-header">
            <div>
              <p class="eyebrow">Decisão</p>
              <h2>Plano da próxima semana</h2>
            </div>
          </div>
          <div class="checkin-grid">
            <label>
              Vitórias
              <textarea id="review-wins" rows="4">${escapeHtml(review.wins || "")}</textarea>
            </label>
            <label>
              Falhas / ruídos
              <textarea id="review-failures" rows="4">${escapeHtml(review.failures || "")}</textarea>
            </label>
            <label>
              Aprendizados
              <textarea id="review-lessons" rows="4">${escapeHtml(review.lessons || "")}</textarea>
            </label>
            <label class="wide">
              Ajustes de método
              <textarea id="review-adjustments" rows="4">${escapeHtml(review.methodAdjustments || suggestedReviewAdjustment(stats))}</textarea>
            </label>
            <label class="wide">
              Foco da próxima semana
              <input id="review-focus" value="${escapeHtml(review.nextWeekFocus || "")}" placeholder="Uma decisão de foco" />
            </label>
          </div>
          <div class="inline-row" style="justify-content: flex-end; margin-top: 14px;">
            <button class="button primary" type="button" data-save-review>Salvar revisão</button>
          </div>
        </section>
      </div>
    `;
  }

  function suggestedReviewAdjustment(stats) {
    if (stats.weakestBehavior) {
      return `Reduzir fricção de "${stats.weakestBehavior.behavior.title}" e proteger um horário fixo antes de adicionar novos indicadores.`;
    }
    return "Manter os não negociáveis e revisar o planejamento ao fim do dia.";
  }

  function openProjectModal() {
    projectForm.reset();
    projectForm.elements.deadline.value = addDays(todayISO(), 90);
    modal.hidden = false;
    setTimeout(() => projectForm.elements.title.focus(), 0);
  }

  function closeProjectModal() {
    modal.hidden = true;
  }

  function addProject(formData) {
    const projectId = id("project");
    const project = {
      id: projectId,
      title: formData.get("title").trim(),
      area: formData.get("area"),
      currentState: formData.get("currentState").trim(),
      desiredState: formData.get("desiredState").trim(),
      successCriteria: formData.get("successCriteria").trim(),
      deadline: formData.get("deadline"),
      status: "active",
      audacityLevel: "forte",
      mentor: "",
      motivation: {
        why: formData.get("why").trim(),
        lifeChange: formData.get("desiredState").trim(),
        whoBenefits: "",
        costOfInaction: formData.get("costOfInaction").trim(),
        commitmentPhrase: formData.get("commitmentPhrase").trim() || "Meca o que voce fez. Ajuste o metodo. Repita melhor amanha.",
      },
      method: {
        description: formData.get("methodDescription").trim(),
        minimumExecutionScore: 85,
        reviewCadence: "weekly",
        assumptions: "",
        nonNegotiableRules: "Executar os comportamentos iniciais e fechar check-in.",
      },
      movements: [
        { title: "Clarear", description: "Definir exatamente o que precisa mudar." },
        { title: "Executar", description: "Repetir os comportamentos rastreáveis." },
        { title: "Medir", description: "Ler os indicadores sem achismo." },
        { title: "Ajustar", description: "Corrigir o método sem abandonar a meta." },
      ],
      skills: [
        { title: "Disciplina", levelNow: 4, levelTarget: 8 },
        { title: "Foco", levelNow: 4, levelTarget: 8 },
        { title: "Revisão", levelNow: 3, levelTarget: 8 },
      ],
      createdAt: todayISO(),
    };

    const newBehaviors = [1, 2, 3]
      .map((number, index) => {
        const title = formData.get(`behavior${number}`)?.trim();
        if (!title) return null;
        const unit = formData.get(`unit${number}`)?.trim() || "check";
        const targetValue = Number(formData.get(`target${number}`)) || 1;
        return {
          id: id("behavior"),
          projectId,
          title,
          type: unit === "check" ? "binary" : unit === "min" ? "duration" : "numeric",
          area: index === 0 ? "Método" : "Execução",
          frequency: "daily",
          targetValue,
          unit,
          weight: index === 0 ? 3 : 2,
          isNonNegotiable: true,
          difficultyLevel: index + 1,
          active: true,
        };
      })
      .filter(Boolean);

    state.projects.push(project);
    state.behaviors.push(...newBehaviors);
    state.selectedProjectId = projectId;
    state.activeView = "projects";
    saveState();
    closeProjectModal();
    render();
    showToast("Projeto criado com método e indicadores iniciais.");
  }

  function addTask() {
    const titleInput = document.getElementById("task-title");
    const quadrantInput = document.getElementById("task-quadrant");
    const title = titleInput?.value.trim();
    if (!title) return showToast("Digite uma tarefa variável.");
    state.tasks.push({
      id: id("task"),
      projectId: state.selectedProjectId,
      date: state.selectedDate,
      title,
      quadrant: quadrantInput.value,
      done: false,
    });
    saveState();
    render();
  }

  function addBehavior() {
    const title = document.getElementById("new-behavior-title")?.value.trim();
    const type = document.getElementById("new-behavior-type")?.value || "binary";
    if (!title) return showToast("Digite o comportamento rastreável.");
    state.behaviors.push({
      id: id("behavior"),
      projectId: state.selectedProjectId,
      title,
      type,
      area: "Execução",
      frequency: "daily",
      targetValue: type === "binary" ? 1 : 30,
      unit: type === "duration" ? "min" : type === "numeric" ? "un" : "check",
      weight: 2,
      isNonNegotiable: false,
      difficultyLevel: 2,
      active: true,
    });
    saveState();
    render();
    showToast("Indicador adicionado ao método.");
  }

  function saveCheckin() {
    const date = state.selectedDate;
    state.checkins[date] = {
      date,
      energyScore: Number(document.getElementById("checkin-energyScore")?.value || 3),
      clarityScore: Number(document.getElementById("checkin-clarityScore")?.value || 3),
      focusScore: Number(document.getElementById("checkin-focusScore")?.value || 3),
      mainObstacle: document.getElementById("checkin-mainObstacle")?.value || "",
      microWin: document.getElementById("checkin-microWin")?.value.trim() || "",
      adjustmentForTomorrow: document.getElementById("checkin-adjustment")?.value.trim() || "",
      note: document.getElementById("checkin-note")?.value.trim() || "",
    };
    saveState();
    render();
    showToast("Check-in salvo. O método agora tem mais evidência.");
  }

  function saveReview() {
    const project = activeProject();
    const weekStart = startOfWeek(state.selectedDate);
    const weekEnd = addDays(weekStart, 6);
    const key = reviewKey(project.id, weekStart);
    const scores = rangeDates(weekEnd, 7).map((date) => dayScore(date, project.id));
    state.reviews[key] = {
      projectId: project.id,
      weekStart,
      weekEnd,
      executionAverage: average(scores.filter((score) => score !== null)),
      wins: document.getElementById("review-wins")?.value.trim() || "",
      failures: document.getElementById("review-failures")?.value.trim() || "",
      lessons: document.getElementById("review-lessons")?.value.trim() || "",
      methodAdjustments: document.getElementById("review-adjustments")?.value.trim() || "",
      nextWeekFocus: document.getElementById("review-focus")?.value.trim() || "",
    };
    saveState();
    render();
    showToast("Revisão semanal salva.");
  }

  function exportData() {
    const data = JSON.stringify(state, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `rota-1-export-${todayISO()}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast("Exportação gerada.");
  }

  function showToast(message) {
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => {
      toast.hidden = true;
    }, 2800);
  }

  function scrollToTop() {
    requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }));
  }

  app.addEventListener("click", (event) => {
    const target = event.target.closest("button");
    if (!target) return;

    if (target.dataset.view) {
      const previousView = state.activeView;
      state.activeView = target.dataset.view;
      saveState();
      render();
      if (previousView !== state.activeView) scrollToTop();
      return;
    }

    if (target.dataset.openProjectModal !== undefined) {
      openProjectModal();
      return;
    }

    if (target.dataset.export !== undefined) {
      exportData();
      return;
    }

    if (target.dataset.dateToday !== undefined) {
      state.selectedDate = todayISO();
      state.calendarCursor = todayISO();
      saveState();
      render();
      scrollToTop();
      return;
    }

    if (target.dataset.dateShift) {
      state.selectedDate = addDays(state.selectedDate, Number(target.dataset.dateShift));
      state.calendarCursor = state.selectedDate;
      saveState();
      render();
      scrollToTop();
      return;
    }

    if (target.dataset.calendarShift) {
      state.calendarCursor = addMonths(state.calendarCursor, Number(target.dataset.calendarShift));
      saveState();
      render();
      return;
    }

    if (target.dataset.selectDate) {
      state.selectedDate = target.dataset.selectDate;
      if (target.dataset.viewAfterDate) state.activeView = target.dataset.viewAfterDate;
      saveState();
      render();
      if (target.dataset.viewAfterDate) scrollToTop();
      return;
    }

    if (target.dataset.logStatus) {
      const behavior = state.behaviors.find((item) => item.id === target.dataset.logStatus);
      const status = target.dataset.status;
      let value = 0;
      if (status === "done") value = behavior?.targetValue || 1;
      if (status === "partial") value = Math.round((behavior?.targetValue || 1) * 0.5);
      setLog(target.dataset.logStatus, state.selectedDate, { status, value });
      return;
    }

    if (target.dataset.addTask !== undefined) {
      addTask();
      return;
    }

    if (target.dataset.toggleTask) {
      const task = state.tasks.find((item) => item.id === target.dataset.toggleTask);
      if (task) task.done = !task.done;
      saveState();
      render();
      return;
    }

    if (target.dataset.deleteTask) {
      state.tasks = state.tasks.filter((task) => task.id !== target.dataset.deleteTask);
      saveState();
      render();
      return;
    }

    if (target.dataset.selectProject) {
      state.selectedProjectId = target.dataset.selectProject;
      saveState();
      render();
      return;
    }

    if (target.dataset.deleteProject) {
      state.pendingDeleteProjectId = target.dataset.deleteProject;
      render();
      return;
    }

    if (target.dataset.cancelDeleteProject !== undefined) {
      state.pendingDeleteProjectId = null;
      render();
      return;
    }

    if (target.dataset.confirmDeleteProject) {
      const projectId = target.dataset.confirmDeleteProject;
      state.projects = state.projects.filter((project) => project.id !== projectId);
      state.behaviors = state.behaviors.filter((behavior) => behavior.projectId !== projectId);
      state.tasks = state.tasks.filter((task) => task.projectId !== projectId);
      state.selectedProjectId = state.projects[0]?.id || null;
      state.pendingDeleteProjectId = null;
      saveState();
      render();
      return;
    }

    if (target.dataset.addBehavior !== undefined) {
      addBehavior();
      return;
    }

    if (target.dataset.saveCheckin !== undefined) {
      saveCheckin();
      return;
    }

    if (target.dataset.saveReview !== undefined) {
      saveReview();
    }
  });

  app.addEventListener("change", (event) => {
    const target = event.target;
    if (target.dataset.logValue) {
      const behavior = state.behaviors.find((item) => item.id === target.dataset.logValue);
      const value = Number(target.value) || 0;
      const status = value >= Number(behavior?.targetValue || 1) ? "done" : value > 0 ? "partial" : "missed";
      setLog(target.dataset.logValue, state.selectedDate, { value, status });
      return;
    }
    if (target.dataset.logQuality) {
      setLog(target.dataset.logQuality, state.selectedDate, { qualityScore: Number(target.value) });
      return;
    }
    if (target.dataset.logFailure) {
      setLog(target.dataset.logFailure, state.selectedDate, { failureReason: target.value });
    }
  });

  app.addEventListener("input", (event) => {
    const target = event.target;
    if (target.dataset.logValue) {
      const behavior = state.behaviors.find((item) => item.id === target.dataset.logValue);
      const value = Number(target.value) || 0;
      const status = value >= Number(behavior?.targetValue || 1) ? "done" : value > 0 ? "partial" : "missed";
      setLog(target.dataset.logValue, state.selectedDate, { value, status }, false);
      clearTimeout(app.inputRenderTimer);
      app.inputRenderTimer = setTimeout(render, 350);
      return;
    }
    if (target.dataset.logNote) {
      const key = logKey(target.dataset.logNote, state.selectedDate);
      const current = state.logs[key] || {
        behaviorId: target.dataset.logNote,
        date: state.selectedDate,
        status: "partial",
        value: 0,
        qualityScore: 3,
        failureReason: "",
      };
      state.logs[key] = { ...current, note: target.value };
      saveState();
    }
    if (target.type === "range" && target.id.startsWith("checkin-")) {
      const label = target.closest("label")?.querySelector("span");
      if (label) label.textContent = target.value;
    }
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal || event.target.closest("[data-close-modal]")) {
      closeProjectModal();
    }
  });

  projectForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addProject(new FormData(projectForm));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeProjectModal();
  });

  render();
})();
