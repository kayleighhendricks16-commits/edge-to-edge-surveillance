const body = document.body;
const menuToggle = document.querySelector("[data-menu-toggle]");
const navPanel = document.querySelector("[data-nav-panel]");
const currentPage = body.dataset.page;
const year = document.querySelector("[data-year]");
const form = document.querySelector(".contact-form");
const formNote = document.querySelector("[data-form-note]");
const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".hero-dot");
const heroPrevBtn = document.querySelector(".hero-prev");
const heroNextBtn = document.querySelector(".hero-next");
const heroSlider = document.querySelector(".hero-slider");
const heroEyebrow = document.querySelector("[data-hero-eyebrow]");
const heroTitle = document.querySelector("[data-hero-title]");
const heroDescription = document.querySelector("[data-hero-description]");
const heroPrimaryBtn = document.querySelector("[data-hero-primary]");
const heroSecondaryBtn = document.querySelector("[data-hero-secondary]");
const heroCopy = document.querySelector(".hero-copy");
const clientCarousel = document.querySelector("[data-client-carousel]");
const clientTrack = document.querySelector("[data-client-track]");
const clientPrev = document.querySelector(".client-prev");
const clientNext = document.querySelector(".client-next");
const navDropdowns = document.querySelectorAll(".nav-dropdown");

if (year) {
  year.textContent = new Date().getFullYear();
}

document.querySelectorAll("[data-nav]").forEach((link) => {
  if (link.dataset.nav === currentPage) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
});

if (menuToggle && navPanel) {
  const mobileMenu = document.createElement("div");
  mobileMenu.className = "mobile-menu";
  mobileMenu.id = "mobileMenu";
  mobileMenu.innerHTML = `
    <div class="mobile-logo"><img src="etelogo.png" alt="Edge to Edge Surveillance logo" /></div>
    <nav class="mobile-nav" aria-label="Mobile navigation">
      <a class="mobile-link" style="--item-index: 0" data-mobile-nav="home" href="index.html">Home</a>
      <a class="mobile-link" style="--item-index: 1" data-mobile-nav="about" href="about.html">About</a>
      <div class="mobile-dropdown" style="--item-index: 2">
        <button class="mobile-link mobile-dropdown-toggle" type="button" aria-expanded="false">Services <span>▾</span></button>
        <div class="mobile-dropdown-menu">
          <a class="mobile-sub-link" href="services.html">All Services</a>
          <a class="mobile-sub-link" href="services.html#access-control">Access Control</a>
          <a class="mobile-sub-link" href="services.html#alarms">Alarms</a>
          <a class="mobile-sub-link" href="services.html#boom-gates">Boom Gates</a>
          <a class="mobile-sub-link" href="services.html#cctv">CCTV</a>
          <a class="mobile-sub-link" href="services.html#control-room">CCTV Control Room</a>
          <a class="mobile-sub-link" href="services.html#electric-fencing">Electric Fencing</a>
          <a class="mobile-sub-link" href="services.html#solar">Solar</a>
        </div>
      </div>
      <div class="mobile-dropdown" style="--item-index: 3">
        <button class="mobile-link mobile-dropdown-toggle" type="button" aria-expanded="false">Solutions <span>▾</span></button>
        <div class="mobile-dropdown-menu">
          <a class="mobile-sub-link" href="solutions.html">All Solutions</a>
          <a class="mobile-sub-link" href="solutions.html#finance-options">Finance Options</a>
          <a class="mobile-sub-link" href="solutions.html#sla-options">Service Level Agreement Options</a>
        </div>
      </div>
      <a class="mobile-link" style="--item-index: 4" data-mobile-nav="contact" href="contact.html">Contact</a>
      <a class="mobile-link mobile-quote" style="--item-index: 5" href="contact.html#contact-form">Request A Quote</a>
    </nav>
  `;
  document.body.appendChild(mobileMenu);

  mobileMenu.querySelectorAll("[data-mobile-nav]").forEach((link) => {
    if (link.dataset.mobileNav === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  mobileMenu.querySelectorAll(".mobile-dropdown-toggle").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const dropdown = toggle.closest(".mobile-dropdown");
      const isOpen = dropdown.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  });

  const closeMobileMenu = () => {
    body.classList.remove("menu-open");
    menuToggle.classList.remove("active");
    mobileMenu.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    navDropdowns.forEach((dropdown) => {
      const toggle = dropdown.querySelector(".nav-dropdown-toggle");
      dropdown.classList.remove("is-open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    });
    mobileMenu.querySelectorAll(".mobile-dropdown").forEach((dropdown) => {
      const toggle = dropdown.querySelector(".mobile-dropdown-toggle");
      dropdown.classList.remove("is-open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    });
  };

  const handleMobileNavigation = (event) => {
    const link = event.currentTarget;
    const href = link.getAttribute("href");
    if (!href || href === "#") return;

    const targetUrl = new URL(href, window.location.href);
    const isSamePage = targetUrl.pathname === window.location.pathname;

    if (isSamePage) closeMobileMenu();
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("menu-open");
    menuToggle.classList.toggle("active", isOpen);
    if (isOpen) {
      mobileMenu.classList.remove("active");
      requestAnimationFrame(() => {
        mobileMenu.classList.add("active");
      });
    } else {
      mobileMenu.classList.remove("active");
    }
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", handleMobileNavigation);
  });
}

navDropdowns.forEach((dropdown) => {
  const toggle = dropdown.querySelector(".nav-dropdown-toggle");
  if (!toggle) return;

  toggle.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const isOpen = dropdown.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
});

document.addEventListener("click", (event) => {
  navDropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".nav-dropdown-toggle");
    if (!toggle) return;
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (form && formNote) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    formNote.textContent = "Thank you. Your enquiry has been captured for this website demo.";
    form.reset();
  });
}

if (heroSlides.length > 1) {
  let heroCurrentSlide = 0;
  let heroInterval = null;
  let heroTransitioning = false;
  const heroDelay = 6200;
  const heroCopyTransitionMs = 300;

  const applyHeroContent = (slideElement) => {
    if (!slideElement) return;
    if (heroEyebrow && slideElement.dataset.eyebrow) heroEyebrow.textContent = slideElement.dataset.eyebrow;
    if (heroTitle && slideElement.dataset.title) heroTitle.textContent = slideElement.dataset.title;
    if (heroDescription && slideElement.dataset.description) heroDescription.textContent = slideElement.dataset.description;
    if (heroPrimaryBtn) {
      if (slideElement.dataset.primaryLabel) heroPrimaryBtn.textContent = slideElement.dataset.primaryLabel;
      if (slideElement.dataset.primaryLink) heroPrimaryBtn.setAttribute("href", slideElement.dataset.primaryLink);
    }
    if (heroSecondaryBtn) {
      if (slideElement.dataset.secondaryLabel) heroSecondaryBtn.textContent = slideElement.dataset.secondaryLabel;
      if (slideElement.dataset.secondaryLink) heroSecondaryBtn.setAttribute("href", slideElement.dataset.secondaryLink);
    }
  };

  const renderHeroState = () => {
    heroSlides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === heroCurrentSlide;
      slide.classList.toggle("is-active", isActive);
    });

    heroDots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === heroCurrentSlide);
    });

    applyHeroContent(heroSlides[heroCurrentSlide]);
  };

  const goToHeroSlide = (index) => {
    const nextIndex = (index + heroSlides.length) % heroSlides.length;
    if (nextIndex === heroCurrentSlide || heroTransitioning) return;
    heroTransitioning = true;

    if (heroCopy) {
      heroCopy.classList.add("is-switching");
      window.setTimeout(() => {
        heroCurrentSlide = nextIndex;
        renderHeroState();
        requestAnimationFrame(() => {
          heroCopy.classList.remove("is-switching");
          window.setTimeout(() => {
            heroTransitioning = false;
          }, heroCopyTransitionMs);
        });
      }, 120);
      return;
    }

    heroCurrentSlide = nextIndex;
    renderHeroState();
    heroTransitioning = false;
  };

  const nextHeroSlide = () => goToHeroSlide(heroCurrentSlide + 1);
  const prevHeroSlide = () => goToHeroSlide(heroCurrentSlide - 1);

  const stopHeroSlider = () => {
    if (!heroInterval) return;
    clearInterval(heroInterval);
    heroInterval = null;
  };

  const startHeroSlider = () => {
    stopHeroSlider();
    heroInterval = window.setInterval(nextHeroSlide, heroDelay);
  };

  const handleNextSlide = () => {
    nextHeroSlide();
    startHeroSlider();
  };

  const handlePrevSlide = () => {
    prevHeroSlide();
    startHeroSlider();
  };

  window.edgeHeroNext = handleNextSlide;
  window.edgeHeroPrev = handlePrevSlide;

  if (heroNextBtn) {
    heroNextBtn.addEventListener("click", (event) => {
      event.preventDefault();
      handleNextSlide();
    });
  }

  if (heroPrevBtn) {
    heroPrevBtn.addEventListener("click", (event) => {
      event.preventDefault();
      handlePrevSlide();
    });
  }

  heroDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = Number.parseInt(dot.dataset.index || "0", 10);
      goToHeroSlide(index);
      startHeroSlider();
    });
  });

  if (heroSlider) {
    heroSlider.addEventListener("mouseenter", stopHeroSlider);
    heroSlider.addEventListener("mouseleave", startHeroSlider);
  }

  renderHeroState();
  startHeroSlider();
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const parallaxSlides = document.querySelectorAll(".hero-slide");
  const onParallax = () => {
    const scrollY = window.scrollY || 0;
    const offset = Math.min(22, scrollY * 0.045);
    parallaxSlides.forEach((slide) => {
      slide.style.backgroundPosition = `center calc(50% + ${offset}px)`;
    });
  };

  onParallax();
  window.addEventListener("scroll", onParallax, { passive: true });
}

if (clientCarousel && clientTrack) {
  const clientCards = Array.from(clientTrack.querySelectorAll(".client-card"));
  let clientIndex = 0;
  let clientInterval = null;

  const getVisibleClients = () => {
    if (window.innerWidth < 540) return 1;
    if (window.innerWidth < 840) return 2;
    return 4;
  };

  const renderClientCarousel = () => {
    const visible = getVisibleClients();
    const maxIndex = Math.max(0, clientCards.length - visible);
    if (clientIndex > maxIndex) clientIndex = 0;
    const cardWidth = clientCards[0]?.offsetWidth || 0;
    const gap = 16;
    const offset = clientIndex * (cardWidth + gap);
    clientTrack.style.transform = `translateX(-${offset}px)`;
  };

  const nextClientSlide = () => {
    const visible = getVisibleClients();
    const maxIndex = Math.max(0, clientCards.length - visible);
    clientIndex = clientIndex >= maxIndex ? 0 : clientIndex + 1;
    renderClientCarousel();
  };

  const prevClientSlide = () => {
    const visible = getVisibleClients();
    const maxIndex = Math.max(0, clientCards.length - visible);
    clientIndex = clientIndex <= 0 ? maxIndex : clientIndex - 1;
    renderClientCarousel();
  };

  const stopClientCarousel = () => {
    if (!clientInterval) return;
    clearInterval(clientInterval);
    clientInterval = null;
  };

  const startClientCarousel = () => {
    stopClientCarousel();
    clientInterval = window.setInterval(nextClientSlide, 3200);
  };

  if (clientNext) {
    clientNext.addEventListener("click", () => {
      nextClientSlide();
      startClientCarousel();
    });
  }

  if (clientPrev) {
    clientPrev.addEventListener("click", () => {
      prevClientSlide();
      startClientCarousel();
    });
  }

  clientCarousel.addEventListener("mouseenter", stopClientCarousel);
  clientCarousel.addEventListener("mouseleave", startClientCarousel);
  clientCarousel.addEventListener("touchstart", stopClientCarousel, { passive: true });
  clientCarousel.addEventListener("touchend", startClientCarousel, { passive: true });
  window.addEventListener("resize", renderClientCarousel);

  renderClientCarousel();
  startClientCarousel();
}
