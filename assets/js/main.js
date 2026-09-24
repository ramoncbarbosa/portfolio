import { menu } from "./menu.js";
import { skillsCarousel } from "./skills.js";
import { i18n } from "./i18n.js?v=profile-copy-refresh-10";

menu();
skillsCarousel();
i18n();

// Local navigation and preferences work even if the external slider is unavailable.
if (window.Swiper) {
  const swiper = new Swiper(".slider-wrapper", {
    loop: false,
    initialSlide: 0,
    rewind: true,
    grabCursor: true,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    keyboard: { enabled: true, onlyInViewport: true },
    a11y: {
      prevSlideMessage: "Projeto anterior",
      nextSlideMessage: "Próximo projeto",
      paginationBulletMessage: "Ir para o projeto {{index}}",
      slideLabelMessage: "Projeto {{index}} de {{slidesLength}}",
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });

  // Keep the first project (LogiBots.AI) as the deterministic entry point.
  const showFirstProject = () => {
    if (!swiper.destroyed) {
      swiper.update();
      swiper.slideTo(0, 0, false);
    }
  };
  showFirstProject();
  window.addEventListener("load", showFirstProject, { once: true });
  document.querySelectorAll('a[href="#s-projects"]').forEach((link) => {
    link.addEventListener("click", () => window.setTimeout(showFirstProject, 400));
  });
  swiper.on("breakpoint", showFirstProject);
  const projectSliderElement = document.querySelector("#s-projects .slider-wrapper");
  if (projectSliderElement && "ResizeObserver" in window) {
    let previousWidth = 0;
    new ResizeObserver(() => {
      const currentWidth = projectSliderElement.clientWidth;
      if (currentWidth !== previousWidth) {
        previousWidth = currentWidth;
        showFirstProject();
      }
    }).observe(projectSliderElement);
  }

  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const updateMotion = () => {
    swiper.params.speed = reducedMotion.matches || document.documentElement.dataset.motion === "reduce" ? 0 : 300;
  };
  reducedMotion.addEventListener("change", updateMotion);
  document.addEventListener("preferenceschange", updateMotion);
  updateMotion();
}
