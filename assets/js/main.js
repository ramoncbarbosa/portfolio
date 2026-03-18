import { menu } from "./menu.js";

menu();

const swiper = new Swiper(".slider-wrapper", {
  loop: true,
  grabCursor: true,
  spaceBetween: 30,

  // Pagination bullets
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // Responsive breakpoints
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

const btnDownload = document.getElementById("btn-download");

if (btnDownload) {
  btnDownload.addEventListener("click", () => {
    // Seleciona o elemento que você quer transformar em PDF (neste caso, o <main> inteiro)
    const element = document.querySelector("main");

    // Configurações do PDF
    const options = {
      margin: 10, // Margem de 10mm
      filename: "Curriculo_Ramon_Castro_Barbosa.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2, // Melhora a resolução do PDF
        useCORS: true // Permite carregar imagens externas ou fontes do Google
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
    };

    // Gera o PDF
    html2pdf().set(options).from(element).save();
  });
}
