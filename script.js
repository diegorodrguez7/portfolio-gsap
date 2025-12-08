document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const body = document.body;
  const hero = document.getElementById("hero");
  const heroRoleText = document.getElementById("hero-role-text");
  const heroClock = document.getElementById("hero-clock");
  const cookieBanner = document.getElementById("cookie-banner");
  const cookieAccept = document.getElementById("cookie-accept");
  const codeLines = document.querySelectorAll(".code-line");
  const heroProgress = document.getElementById("hero-progress");
  const heroProgressLabel = document.getElementById("hero-progress-label");
  const heroTarget = document.querySelector(".hero-target");
  const heroName = document.querySelector(".hero-name");
  if (heroName) heroName.style.whiteSpace = "nowrap";

  // -------- Data para personalizar --------
  const featuredRepos = [
    {
      title: "robootics-web-app",
      description: "Plataforma educativa: backend modular, dashboards y despliegue automatizado.",
      coverLabel: "Robootics Education S.L",
      github: "https://robooticseducation.com",
      tech: ["Laravel", "Docker", "MySQL", "Git"],
    },
    {
      title: "sensores-app",
      description: "Visualizador web en tiempo real de datos de sensores de temperatura y humedad, conectado a una base de datos",
      coverLabel: "Sensores APP",
      github: "https://github.com/diegorodrguez7/sensores/tree/main",
      tech: ["TJavaScript", "Node", "Git", "Supabase"],
    },
    {
      title: "diagramas-app",
      description: "Web 3D progresiva para la creación de diagramas interactivos.",
      coverLabel: "Diagramas XYZ",
      github: "https://diagramas.xyzdigital.es",
      tech: ["JavaScript", "TypeScrypt", "Python"],
    },
  ];

  const techStack = [
    { name: "Laravel", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/laravel.svg" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  ];

  const experiences = [
    {
      company: "Robootics Education SL",
      role: "Ingeniero de software",
      type: "Jornada Completa · Presencial",
      startDate: "2025-08-10",
      endDate: null,
      location: "Breña Baja, Canarias, España",
      tech: "JavaScript, Laravel",
      active: true,
    },
    {
      company: "Babel",
      role: "Ingeniero de software",
      type: "Contrato de prácticas · En remoto",
      startDate: "2023-03-01",
      endDate: "2023-10-01",
      location: "Madrid, España",
      tech: "JavaScript, .NET Framework",
      active: false,
    },
    {
      company: "Babel",
      role: "Ingeniero de software júnior",
      type: "Jornada completa · Presencial",
      startDate: "2023-01-01",
      endDate: "2023-03-01",
      location: "Proença-a-Nova, Portugal",
      tech: "Outsystems",
      active: false,
    },
  ];

  const studies = [
    {
      title: "Certificaciones Laravel y Python · IA y análisis de datos",
      detail: "+159h - Angualar, Vue.js, Pandas, NumPy, Matplotlib, Scikit-learn",
    },
    {
      title: "Técnico en Desarrollo de Aplicaciones Web",
      detail: "Departamento informática · IES José María Pérez Pulido",
    },
  ];
  // ----------------------------------------

  // Tema fijo (sin toggle)
  body.dataset.theme = "dark";
  document.documentElement.style.colorScheme = "dark";

  const monthNamesShort = ["ene.", "feb.", "mar.", "abr.", "may.", "jun.", "jul.", "ago.", "sept.", "oct.", "nov.", "dic."];

  const formatDateLabel = (iso) => {
    const d = new Date(iso);
    if (Number.isNaN(d)) return "";
    return `${monthNamesShort[d.getMonth()]} ${d.getFullYear()}`;
  };

  const diffMonths = (start, end) => {
    let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    if (end.getDate() < start.getDate()) months -= 1;
    return Math.max(months, 0);
  };

  const formatExperiencePeriod = (exp) => {
    if (exp.startDate) {
      const start = new Date(exp.startDate);
      const end = exp.endDate ? new Date(exp.endDate) : new Date();
      if (Number.isNaN(start) || Number.isNaN(end)) return exp.period || "";
      const months = diffMonths(start, end);
      const monthsLabel = months === 1 ? "1 mes" : `${months} meses`;
      const startLabel = formatDateLabel(start);
      const endLabel = exp.endDate ? formatDateLabel(end) : "actualidad";
      return `${startLabel} - ${endLabel} · ${monthsLabel}`;
    }
    return exp.period || "";
  };

  // Hero role rotatorio
  const roles = ["Desarrollador Web Full Stack", "Programador Junior"];
  let roleIndex = 0;
  setInterval(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    if (heroRoleText) {
      heroRoleText.textContent = roles[roleIndex];
    }
  }, 2000);

  // Code lines dinámicas estilo consola
  const steps = [
    "cargando entorno...",
    "preparando dependencias...",
    "conectando a servidor...",
    "sincronizando assets...",
    "iniciando build...",
    "desplegando en CDN...",
    "verificando integridad...",
    "optimizando imágenes...",
    "configurando seguridad...",
    "aplicando animaciones...",
    "generando sitemap...",
    "revisando logs...",
  ];
  const errorSteps = [
    "ERROR: dependencia no encontrada",
    "ALERTA: checksum inválido",
    "FALLO: assets corruptos",
    "WARN: timeout en CDN",
    "ERROR: permisos insuficientes",
  ];
  let stepIndex = 0;
  const codeInterval = setInterval(() => {
    if (!codeLines.length) return;
    const line = codeLines[stepIndex % codeLines.length];
    line.textContent = steps[Math.min(stepIndex, steps.length - 1)];
    line.style.color = "";
    stepIndex = (stepIndex + 1) % steps.length;
  }, 500);

  // Reloj retro
  const updateClock = () => {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    if (heroClock) heroClock.textContent = `${hh}:${mm}:${ss}`;
  };
  updateClock();
  setInterval(updateClock, 1000);

  // Banner de cookies
  const cookieKey = "cookie_consent";
  const consent = localStorage.getItem(cookieKey);
  if (cookieBanner) {
    if (!consent) {
      cookieBanner.style.display = "flex";
    } else {
      cookieBanner.style.display = "none";
    }
  }
  if (cookieAccept) {
    cookieAccept.addEventListener("click", () => {
      localStorage.setItem(cookieKey, "accepted");
      if (cookieBanner) cookieBanner.style.display = "none";
    });
  }

  // GitHub calendar (heatmap de contribuciones)
  const calendarEl = document.getElementById("github-calendar");
  if (calendarEl && typeof GitHubCalendar === "function") {
    try {
      GitHubCalendar("#github-calendar", "diegorodrguez7", {
        responsive: true,
        tooltips: true,
        cache: 3600,
        summary_text: "",
        global_stats: false,
      });
    } catch (e) {
      calendarEl.textContent = "No se pudo cargar el calendario. Visita github.com/diegorodrguez7";
    }
  }

  // Barra de progreso hero (15s, luego se desvanece)
  if (heroProgress && heroProgressLabel) {
    const duration = 15000;
    const start = performance.now();
    let totalPaused = 0;
    let pauseUntil = 0;
    let pauseStarted = 0;
    const minPausePct = 5;
    const maxPausePct = 95;
    const showErrorLine = () => {
      if (!codeLines.length) return;
      const line = codeLines[Math.floor(Math.random() * codeLines.length)];
      line.textContent = errorSteps[Math.floor(Math.random() * errorSteps.length)];
      line.style.color = "#ff6b6b";
      setTimeout(() => {
        line.style.color = "";
      }, 1200);
    };
    const tick = (now) => {
      if (pauseUntil && now < pauseUntil) {
        requestAnimationFrame(tick);
        return;
      }
      if (pauseUntil && now >= pauseUntil) {
        totalPaused += pauseUntil - pauseStarted;
        pauseUntil = 0;
        pauseStarted = 0;
      }

      const elapsed = Math.min(Math.max(now - start - totalPaused, 0), duration);
      const pct = Math.floor((elapsed / duration) * 100);

      if (!pauseUntil && pct > minPausePct && pct < maxPausePct && Math.random() < 0.01) {
        const pauseDuration = 350 + Math.random() * 800; // 0.35s - 1.15s
        pauseStarted = now;
        pauseUntil = now + pauseDuration;
        showErrorLine();
      }

      heroProgress.style.width = `${pct}%`;
      heroProgressLabel.textContent = `${pct}%`;
      if (elapsed < duration) {
        requestAnimationFrame(tick);
      } else {
        heroProgressLabel.textContent = "100%";
        heroProgress.parentElement.style.opacity = "0";
        heroProgress.parentElement.style.transition = "opacity 0.8s ease";
        // Consola: limpiar y mostrar ready
        clearInterval(codeInterval);
        codeLines.forEach((line, idx) => {
          if (idx === 0) {
            line.textContent = "Ready to deploy 👍";
            line.style.color = "#71f2d4";
          } else {
            line.textContent = "";
            line.style.color = "";
          }
        });
        setTimeout(() => {
          if (heroProgress.parentElement) {
            heroProgress.parentElement.style.display = "none";
          }
        }, 650);
      }
    };
    requestAnimationFrame(tick);
  }

  // Smooth scroll con Lenis (fallback nativo si no carga)
  const LenisClass =
    window.Lenis ||
    (function createFallbackLenis() {
      class FallbackLenis {
        scrollTo(target, options = {}) {
          const offset = options.offset || 0;
          let top = 0;
          if (typeof target === "number") top = target;
          else if (typeof target === "string") {
            const el = document.querySelector(target);
            if (el) top = el.getBoundingClientRect().top + window.scrollY;
          } else if (target && target.getBoundingClientRect) {
            top = target.getBoundingClientRect().top + window.scrollY;
          }
          window.scrollTo({ top: top + offset, behavior: "smooth" });
        }
        raf() {}
        on() {}
      }
      return FallbackLenis;
    })();

  const lenis = new LenisClass({
    duration: 1.35,
    smoothWheel: true,
    smoothTouch: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Navegación animada (CTA)
  document.querySelectorAll("[data-scroll]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("href");
      if (target) {
        lenis.scrollTo(target, { offset: -12, duration: 1.1 });
      }
    });
  });

  // Sin salto automático: el usuario controla el scroll inicial

  // Revelado progresivo de secciones
  const hasGSAP = typeof gsap !== "undefined";
  if (hero) hero.classList.add("revealed");

  // Posicionar mira sobre el nombre
  const positionTarget = () => {
    if (!heroTarget || !heroName || !hero) return;
    const heroRect = hero.getBoundingClientRect();
    const nameRect = heroName.getBoundingClientRect();
    const x = nameRect.left - heroRect.left + nameRect.width / 2;
    const y = nameRect.top - heroRect.top + nameRect.height / 2;
    heroTarget.style.setProperty("--target-x", `${x}px`);
    heroTarget.style.setProperty("--target-y", `${y}px`);
  };
  positionTarget();
  window.addEventListener("resize", positionTarget);

  // Glitch hover en el nombre
  if (heroName) {
    const originalName = heroName.textContent || "";
    const palette = ["#f7f7f7", "#fc0000ff", "#3a2e2eff"];
    const symbols = "01/*##-=+[/}<>$%&";
    let glitchTimer;
    let glitching = false;
    let autoGlitchTimer;

    const runGlitch = () => {
      if (glitching) return;
      glitching = true;
      let frame = 0;
      const totalFrames = 4;
      clearInterval(glitchTimer);
      heroName.classList.add("glitching");
      glitchTimer = setInterval(() => {
        frame += 1;
        if (frame >= totalFrames) {
          clearInterval(glitchTimer);
          heroName.textContent = originalName;
          heroName.style.color = "";
          heroName.classList.remove("glitching");
          glitching = false;
          return;
        }
        const scrambled = [...originalName]
          .map((ch) => (ch === " " ? " " : symbols[Math.floor(Math.random() * symbols.length)]))
          .join("");
        heroName.textContent = scrambled;
        heroName.style.color = palette[frame % palette.length];
      }, 100);
    };

    heroName.setAttribute("tabindex", "0");
    heroName.addEventListener("mouseenter", runGlitch);
    heroName.addEventListener("focus", runGlitch);
    heroName.addEventListener("mouseleave", () => {
      clearInterval(glitchTimer);
      heroName.textContent = originalName;
      heroName.style.color = "";
      heroName.classList.remove("glitching");
      glitching = false;
    });
    heroName.addEventListener("blur", () => {
      clearInterval(glitchTimer);
      heroName.textContent = originalName;
      heroName.style.color = "";
      heroName.classList.remove("glitching");
      glitching = false;
    });

    const scheduleAutoGlitch = () => {
      clearTimeout(autoGlitchTimer);
      const windows = [6000, 5000, 7000, 6500, 4500]; // ms
      const delay = windows[Math.floor(Math.random() * windows.length)] + Math.random() * 250; // leve variación
      autoGlitchTimer = setTimeout(() => {
        runGlitch();
        scheduleAutoGlitch();
      }, delay);
    };
    scheduleAutoGlitch();
  }

  const revealSection = (section) => {
    if (section.dataset.revealed) return;
    section.dataset.revealed = "1";
    section.classList.add("revealed");
    if (hasGSAP && !prefersReducedMotion) {
      gsap.fromTo(
        section,
        { opacity: 0, y: 140, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }
      );
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealSection(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
  );

  document.querySelectorAll(".section").forEach((section) => {
    if (section.id !== "hero") observer.observe(section);
  });

  // Render proyectos
  const projectsList = document.getElementById("projects-list");
  if (projectsList) {
    projectsList.innerHTML = "";
    featuredRepos.forEach((repo) => {
      const card = document.createElement("article");
      card.className = "project-card";
      const cover = document.createElement("div");
      cover.className = "project-cover";
      cover.textContent = repo.coverLabel || repo.title;
      const bodyEl = document.createElement("div");
      bodyEl.className = "project-body";
      bodyEl.innerHTML = `
        <div class="project-meta">
          <h3>${repo.title}</h3>
          <span class="tag">GitHub</span>
        </div>
        <p class="muted">${repo.description}</p>
        <div class="project-meta">
          <div class="project-tags">${(repo.tech || []).map((t) => `<span class="tag">${t}</span>`).join("")}</div>
          <a class="repo-link" href="${repo.github}" target="_blank" rel="noreferrer">Ver repo</a>
        </div>
      `;
      card.appendChild(cover);
      card.appendChild(bodyEl);
      projectsList.appendChild(card);
    });
  }

  // Render stack
  const techList = document.getElementById("tech-list");
  if (techList) {
    techList.innerHTML = "";
    techStack.forEach((tech) => {
      const item = document.createElement("div");
      item.className = "tech-item";
      item.innerHTML = `
        <div class="tech-icon"><img src="${tech.icon}" alt="${tech.name} logo" loading="lazy" /></div>
        <div>
          <strong>${tech.name}</strong>
        </div>
      `;
      techList.appendChild(item);
    });
  }

  // Render experiencia
  const experienceGraph = document.getElementById("experience-graph");
  if (experienceGraph) {
    experienceGraph.innerHTML = "";
    experiences.forEach((exp) => {
      const item = document.createElement("div");
      item.className = "timeline-item";
      if (exp.active) item.dataset.active = "true";
      item.innerHTML = `
        <div class="timeline-node"></div>
          <div class="timeline-card">
            <div class="timeline-meta">
            <span>${formatExperiencePeriod(exp)}</span>
            <span>${exp.type}</span>
          </div>
          <h3>${exp.role} · ${exp.company}</h3>
          <div class="muted">${exp.location}</div>
          <div class="muted">${exp.tech}</div>
        </div>
      `;
      experienceGraph.appendChild(item);
    });
  }

  // Render formación
  const educationList = document.getElementById("education-list");
  if (educationList) {
    educationList.innerHTML = "";
    studies.forEach((study) => {
      const card = document.createElement("div");
      card.className = "education-card";
      card.innerHTML = `
        <h3>${study.title}</h3>
        <div class="muted">${study.detail}</div>
      `;
      educationList.appendChild(card);
    });
  }

  // Slider Monochrome (grid <-> slider)
  const sliderSection = document.querySelector(".mono-slider");
  // Skip slider on mobile widths to avoid carga y render en dispositivos pequeños
  const isMobileWidth = window.innerWidth <= 768;
  if (sliderSection && !isMobileWidth && typeof gsap !== "undefined" && typeof Flip !== "undefined") {
    if (typeof CustomEase !== "undefined") gsap.registerPlugin(CustomEase);
    gsap.registerPlugin(Flip);

    const sliderEls = {
      container: sliderSection.querySelector(".mono-container"),
      grid: sliderSection.querySelector("#mono-grid"),
      gridItems: sliderSection.querySelectorAll(".mono-grid-item"),
      sliderImage: sliderSection.querySelector("#mono-slider-image"),
      sliderImageBg: sliderSection.querySelector("#mono-slider-image-bg"),
      sliderImageNext: sliderSection.querySelector("#mono-slider-image-next"),
      transitionOverlay: sliderSection.querySelector("#mono-transition-overlay"),
      content: sliderSection.querySelector("#mono-content"),
      contentTitleSpan: sliderSection.querySelector(".mono-content-title span"),
      contentParagraph: sliderSection.querySelector("#mono-content-paragraph"),
      thumbnails: sliderSection.querySelectorAll(".mono-thumbnail"),
      switchContainer: sliderSection.querySelector("#mono-switch"),
      switchGrid: sliderSection.querySelector(".mono-switch-button-grid"),
      switchSlider: sliderSection.querySelector(".mono-switch-button-slider"),
      preloader: sliderSection.querySelector(".mono-preloader"),
      preloaderCounter: sliderSection.querySelector(".mono-preloader-counter"),
    };

    const allSliderEls = Object.values(sliderEls);
    if (allSliderEls.some((el) => el === null)) {
      console.warn("Slider: faltan elementos obligatorios, no se inicializa.");
      return;
    }

    const slideContent = [
      {
        title: "Puertos Pesqueros",
        paragraph: "Estructuras pesadas. El acero cobra textura cuando el color desaparece.",
      },
      {
        title: "Bosque Nebuloso",
        paragraph: "Arboles y niebla se mezclan; cada paso cruje y la luz se queda en las copas.",
      },
      {
        title: "Playas Escondidas",
        paragraph: "Mar calmo y cielo plomizo. Silencio y bruma en la linea del horizonte.",
      },
       {
        title: "Calles Típicas",
        paragraph: "Reflejos en el asfalto y luces diluidas; la lluvia convierte la ciudad en negativo.",
      },
      {
        title: "Mirador Nocturno",
        paragraph: "Luces lejanas y viento frio. La altura reduce todo a formas simples y contraste puro.",
      },
      {
        title: "Costa Rocosa",
        paragraph: "Oleaje rompiendo en piedra oscura. El ritmo del agua dibuja la textura de la roca.",
      },
];

    // Ajusta textos para las imágenes locales
    slideContent.splice(
      0,
      slideContent.length,
      {
        title: "Puertos Pesqueros",
        paragraph: "Estructuras pesadas. El acero cobra textura cuando el color desaparece.",
      },
      {
        title: "Bosque Nebuloso",
        paragraph: "Arboles y niebla se mezclan; cada paso cruje y la luz se queda en las copas.",
      },
      {
        title: "Playas Escondidas",
        paragraph: "Mar calmo y cielo plomizo. Silencio y bruma en la linea del horizonte.",
      },
       {
        title: "Calles Típicas",
        paragraph: "Reflejos en el asfalto y luces diluidas; la lluvia convierte la ciudad en negativo.",
      },
      {
        title: "Mirador Nocturno",
        paragraph: "Luces lejanas y viento frio. La altura reduce todo a formas simples y contraste puro.",
      },
      {
        title: "Costa Rocosa",
        paragraph: "Oleaje rompiendo en piedra oscura. El ritmo del agua dibuja la textura de la roca.",
      }
    );


    const imageUrls = Array.from(sliderEls.gridItems).map(
      (item) => item.querySelector(".mono-grid-item-img").style.backgroundImage
    );

    const ensureBW = () => {
      [sliderEls.sliderImage, sliderEls.sliderImageBg, sliderEls.sliderImageNext].forEach((el) => {
        if (el) el.style.filter = "grayscale(1) contrast(0.92) brightness(0.9)";
      });
    };

    const TIMING = {
      BASE: 0.512,
      SHORTEST: 0.256,
      SHORT: 0.384,
      LONG: 0.768,
      STAGGER_TINY: 0.032,
      STAGGER_SMALL: 0.064,
      STAGGER_MED: 0.128,
    };

    Object.assign(TIMING, {
      BASE: 0.44,
      SHORTEST: 0.22,
      SHORT: 0.32,
      LONG: 0.64,
      STAGGER_TINY: 0.028,
      STAGGER_SMALL: 0.052,
      STAGGER_MED: 0.1,
    });

    let currentMode = "grid";
    let isAnimating = false;
    let activeIndex = 4;
    let slideDirection = "right";
    let touchStartX = 0;
    let touchEndX = 0;

    const getContainerRect = () => sliderEls.container.getBoundingClientRect();
    const getItemRect = (item) => {
      const rect = item.getBoundingClientRect();
      const cRect = getContainerRect();
      return {
        x: rect.left - cRect.left,
        y: rect.top - cRect.top,
        width: rect.width,
        height: rect.height,
      };
    };

    const updateContent = (index) => {
      const content = slideContent[index];
      if (!content) return;
      sliderEls.contentTitleSpan.textContent = content.title;
      sliderEls.contentParagraph.textContent = content.paragraph;
    };

    const setActiveThumbnail = (index) => {
      sliderEls.thumbnails.forEach((thumb) => thumb.classList.remove("active"));
      const thumb = sliderSection.querySelector(`.mono-thumbnail[data-index="${index}"]`);
      if (thumb) thumb.classList.add("active");
    };

    const showSliderView = () =>
      new Promise((resolve) => {
        const activeItem = sliderSection.querySelector(`.mono-grid-item[data-index="${activeIndex}"]`);
        if (!activeItem) return resolve();
        const { x, y, width, height } = getItemRect(activeItem);
        const cRect = getContainerRect();
        const activeUrl = imageUrls[activeIndex];

        sliderEls.sliderImage.style.backgroundImage = activeUrl;
        sliderEls.sliderImageBg.style.backgroundImage = activeUrl;
        sliderEls.sliderImageNext.style.backgroundImage = activeUrl;
        ensureBW();
        updateContent(activeIndex);

        gsap.set(sliderEls.sliderImage, {
          width,
          height,
          x,
          y,
          opacity: 1,
          visibility: "visible",
        });

        const heightState = Flip.getState(sliderEls.sliderImage);
        gsap.set(sliderEls.sliderImage, { height: cRect.height, y: 0, width, x });

        Flip.from(heightState, {
          duration: TIMING.BASE,
          ease: "mainEase",
          onComplete: () => {
            const widthState = Flip.getState(sliderEls.sliderImage);
            gsap.set(sliderEls.sliderImage, { width: cRect.width, x: 0 });

            Flip.from(widthState, {
              duration: TIMING.BASE,
              ease: "mainEase",
              onComplete: () => {
                gsap.to(sliderEls.grid, { opacity: 0, duration: TIMING.SHORTEST, ease: "power2.inOut" });

                const tl = gsap.timeline({ onComplete: resolve });
                tl.to(
                  sliderEls.content,
                  { opacity: 1, duration: TIMING.SHORT, ease: "mainEase" },
                  0
                );
                tl.to(
                  sliderEls.contentTitleSpan,
                  { y: 0, duration: TIMING.BASE, ease: "sideEase" },
                  TIMING.STAGGER_TINY
                );
                tl.to(
                  sliderEls.contentParagraph,
                  { opacity: 1, duration: TIMING.BASE, ease: "mainEase" },
                  TIMING.STAGGER_SMALL
                );
                tl.to(
                  sliderEls.thumbnails,
                  {
                    opacity: 1,
                    y: 0,
                    duration: TIMING.SHORT,
                    stagger: TIMING.STAGGER_TINY,
                    ease: "sideEase",
                  },
                  TIMING.STAGGER_MED
                );
              },
            });
          },
        });
      });

    const showGridView = () =>
      new Promise((resolve) => {
        const activeItem = sliderSection.querySelector(`.mono-grid-item[data-index="${activeIndex}"]`);
        if (!activeItem) return resolve();
        const { x, y, width, height } = getItemRect(activeItem);
        const cRect = getContainerRect();

        const tl = gsap.timeline({
          onComplete: () => {
            gsap.to(sliderEls.grid, { opacity: 1, duration: TIMING.SHORTEST, ease: "power2.inOut" });
            gsap.set([sliderEls.sliderImageNext, sliderEls.sliderImageBg, sliderEls.transitionOverlay], {
              opacity: 0,
              visibility: "hidden",
            });

            const widthState = Flip.getState(sliderEls.sliderImage);
            gsap.set(sliderEls.sliderImage, { width, x, height: cRect.height, y: 0 });

            Flip.from(widthState, {
              duration: TIMING.BASE,
              ease: "mainEase",
              onComplete: () => {
                const heightState = Flip.getState(sliderEls.sliderImage);
                gsap.set(sliderEls.sliderImage, { height, y });

                Flip.from(heightState, {
                  duration: TIMING.BASE,
                  ease: "mainEase",
                  onComplete: () => {
                    gsap.to(sliderEls.sliderImage, {
                      opacity: 0,
                      duration: TIMING.SHORTEST,
                      ease: "power2.inOut",
                      onComplete: () => {
                        sliderEls.sliderImage.style.visibility = "hidden";
                        resolve();
                      },
                    });
                  },
                });
              },
            });
          },
        });

        tl.to(
          sliderEls.thumbnails,
          {
            opacity: 0,
            y: 20,
            duration: TIMING.SHORT,
            stagger: -TIMING.STAGGER_TINY,
            ease: "sideEase",
          },
          0
        );

        tl.to(
          sliderEls.contentParagraph,
          { opacity: 0, duration: TIMING.SHORT, ease: "mainEase" },
          TIMING.STAGGER_TINY
        );

        tl.to(
          sliderEls.contentTitleSpan,
          { y: "100%", duration: TIMING.SHORT, ease: "sideEase" },
          TIMING.STAGGER_SMALL
        );

        tl.to(
          sliderEls.content,
          { opacity: 0, duration: TIMING.SHORT, ease: "mainEase" },
          TIMING.STAGGER_MED
        );
      });

    const transitionToSlide = (index) => {
      if (isAnimating || index === activeIndex || currentMode !== "slider") return;
      isAnimating = true;

      slideDirection = index > activeIndex ? "right" : "left";
      setActiveThumbnail(index);

      const newImageUrl = imageUrls[index];
      const currentImageUrl = imageUrls[activeIndex];
      const xOffset = slideDirection === "right" ? "100%" : "-100%";

      sliderEls.sliderImageNext.style.backgroundImage = newImageUrl;
      sliderEls.sliderImageBg.style.backgroundImage = newImageUrl;
      sliderEls.sliderImage.style.backgroundImage = currentImageUrl;
      ensureBW();

      gsap.set([sliderEls.sliderImageNext, sliderEls.sliderImageBg], { visibility: "visible" });
      gsap.set(sliderEls.sliderImageNext, { x: xOffset, y: 0, opacity: 1, width: "100%", height: "100%" });
      gsap.set(sliderEls.sliderImageBg, {
        x: xOffset,
        y: 0,
        opacity: 0.9,
        width: "100%",
        height: "100%",
        scale: 1,
      });

      const masterTl = gsap.timeline({
        onComplete: () => {
          sliderEls.sliderImage.style.backgroundImage = newImageUrl;
          gsap.set([sliderEls.sliderImageNext, sliderEls.sliderImageBg, sliderEls.transitionOverlay], {
            opacity: 0,
            x: 0,
            y: 0,
            visibility: "hidden",
          });
          gsap.set(sliderEls.sliderImage, { x: 0, opacity: 1 });
          updateContent(index);
          activeIndex = index;

          const showTl = gsap.timeline({
            onComplete: () => {
              isAnimating = false;
            },
          });

          showTl.to(sliderEls.contentTitleSpan, { y: 0, duration: TIMING.BASE, ease: "sideEase" }, 0);
          showTl.to(
            sliderEls.contentParagraph,
            { opacity: 1, duration: TIMING.BASE, ease: "mainEase" },
            TIMING.STAGGER_SMALL
          );
        },
      });

      masterTl.to(
        sliderEls.contentParagraph,
        { opacity: 0, duration: TIMING.SHORT, ease: "mainEase" },
        0
      );

      masterTl.to(
        sliderEls.contentTitleSpan,
        { y: "100%", duration: TIMING.SHORT, ease: "sideEase" },
        TIMING.STAGGER_TINY
      );

      masterTl.to(
        sliderEls.transitionOverlay,
        { opacity: 0.15, duration: TIMING.SHORTEST, ease: "power1.in" },
        TIMING.STAGGER_SMALL
      );

      masterTl.to(
        sliderEls.transitionOverlay,
        { opacity: 0, duration: TIMING.SHORT, ease: "power1.out" },
        TIMING.STAGGER_MED
      );

      masterTl.to(
        sliderEls.sliderImage,
        {
          x: slideDirection === "right" ? "-35%" : "35%",
          opacity: 1,
          duration: TIMING.LONG,
          ease: "mainEase",
        },
        0
      );

      masterTl.to(
        sliderEls.sliderImageBg,
        {
          x: slideDirection === "right" ? "-10%" : "10%",
          y: 0,
          opacity: 0.95,
          scale: 1,
          duration: TIMING.LONG,
          ease: "sideEase",
        },
        TIMING.STAGGER_TINY
      );

      masterTl.to(
        sliderEls.sliderImageNext,
        {
          x: 0,
          opacity: 1,
          duration: TIMING.LONG,
          ease: "sideEase",
        },
        TIMING.STAGGER_SMALL
      );
    };

    const toggleView = (mode) => {
      if (isAnimating || currentMode === mode) return;
      isAnimating = true;

      sliderSection.querySelector(".mono-switch-button-current")?.classList.remove("mono-switch-button-current");
      sliderSection.querySelector(`.mono-switch-button-${mode}`)?.classList.add("mono-switch-button-current");

      currentMode = mode;
      if (mode === "slider") {
        showSliderView().then(() => {
          isAnimating = false;
        });
      } else {
        showGridView().then(() => {
          isAnimating = false;
        });
      }
    };

    // Eventos
    sliderEls.thumbnails.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        const index = parseInt(thumb.getAttribute("data-index"), 10);
        transitionToSlide(index);
      });
    });

    sliderEls.switchGrid.addEventListener("click", () => toggleView("grid"));
    sliderEls.switchSlider.addEventListener("click", () => toggleView("slider"));

    const handleSwipe = () => {
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
        const nextIndex = (activeIndex + 1) % imageUrls.length;
        transitionToSlide(nextIndex);
      } else if (touchEndX > touchStartX + swipeThreshold) {
        const prevIndex = (activeIndex - 1 + imageUrls.length) % imageUrls.length;
        transitionToSlide(prevIndex);
      }
    };

    document.addEventListener("keydown", (e) => {
      if (currentMode !== "slider" || isAnimating) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        transitionToSlide((activeIndex + 1) % imageUrls.length);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        transitionToSlide((activeIndex - 1 + imageUrls.length) % imageUrls.length);
      }
    });

    document.addEventListener("touchstart", (e) => {
      if (currentMode !== "slider" || isAnimating) return;
      touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener("touchend", (e) => {
      if (currentMode !== "slider" || isAnimating) return;
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    // Preloader sencillo
    const startCounter = () => {
      if (!sliderEls.preloader || !sliderEls.preloaderCounter) {
        initSlider();
        return;
      }
      let count = 0;
      const increment = 5;
      const interval = setInterval(() => {
        count += increment;
        sliderEls.preloaderCounter.textContent = Math.min(count, 100);
        if (count >= 100) {
          clearInterval(interval);
          sliderEls.preloader.classList.add("hidden");
          setTimeout(initSlider, 180);
        }
      }, 90);
    };

    const initSlider = () => {
      updateContent(activeIndex);
      setActiveThumbnail(activeIndex);
      gsap.set(sliderEls.content, { opacity: 0 });
      gsap.set(sliderEls.contentTitleSpan, { y: "100%" });
      gsap.set(sliderEls.contentParagraph, { opacity: 0 });
      gsap.set(sliderEls.sliderImage, { opacity: 0, visibility: "hidden", backgroundImage: imageUrls[activeIndex] });
      gsap.set(sliderEls.sliderImageBg, { opacity: 0, visibility: "hidden" });
      gsap.set(sliderEls.sliderImageNext, { opacity: 0, visibility: "hidden" });
      gsap.set(sliderEls.transitionOverlay, { opacity: 0, visibility: "hidden" });
      gsap.set(sliderEls.thumbnails, { opacity: 0, y: 20 });
      ensureBW();
    };

    let sliderInitialized = false;
    const triggerInit = () => {
      if (sliderInitialized) return;
      sliderInitialized = true;
      startCounter();
    };

    const rect = sliderSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 1.2) {
      triggerInit();
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              triggerInit();
              io.disconnect();
            }
          });
        },
        { threshold: 0.2 }
      );
      io.observe(sliderSection);
    }
  }
});
