import { menu } from "./menu.js";
import { skillsCarousel } from "./skills.js";
import { i18n } from "./i18n.js";

menu();
skillsCarousel();
i18n();

// Local navigation and preferences work even if the external slider is unavailable.
if (window.Swiper) {
  const swiper = new Swiper(".slider-wrapper", {
    loop: true,
    grabCursor: true,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
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

  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const updateMotion = () => {
    swiper.params.speed = reducedMotion.matches || document.documentElement.dataset.motion === "reduce" ? 0 : 300;
  };
  reducedMotion.addEventListener("change", updateMotion);
  document.addEventListener("preferenceschange", updateMotion);
  updateMotion();
}
