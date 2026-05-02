const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const countdownRoot = document.querySelector("[data-countdown]");
const dayEl = document.querySelector("[data-days]");
const hourEl = document.querySelector("[data-hours]");
const minuteEl = document.querySelector("[data-minutes]");

function getNextFridayOperation() {
  const now = new Date();
  const target = new Date(now);
  const day = now.getDay();
  let daysUntilFriday = (5 - day + 7) % 7;

  if (daysUntilFriday === 0 && now.getHours() >= 22) {
    daysUntilFriday = 7;
  }

  target.setDate(now.getDate() + daysUntilFriday);
  target.setHours(22, 0, 0, 0);

  return target;
}

function updateCountdown() {
  if (!countdownRoot || !dayEl || !hourEl || !minuteEl) {
    return;
  }

  const diff = getNextFridayOperation() - new Date();
  const totalMinutes = Math.max(0, Math.floor(diff / 60000));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  dayEl.textContent = String(days).padStart(2, "0");
  hourEl.textContent = String(hours).padStart(2, "0");
  minuteEl.textContent = String(minutes).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 60000);

const unitTabs = document.querySelectorAll(".unit-tab");
const unitImage = document.querySelector("#unit-image");
const unitKicker = document.querySelector("#unit-kicker");
const unitTitle = document.querySelector("#unit-title");
const unitText = document.querySelector("#unit-text");
const unitList = document.querySelector("#unit-list");

const unitContent = {
  linea: {
    kicker: "Escuadra de linea",
    title: "La columna vertebral de cada operacion.",
    text: "Ideal para jugadores que disfrutan el contacto directo, el avance por sectores y el trabajo en formacion bajo un lider de escuadra.",
    image: "https://reforger.armaplatform.com/content/screenshots/version1.0/boarding.jpg",
    alt: "Soldados abordando un helicoptero en Arma Reforger",
    points: [
      "Fusileros, ametralladores y AT ligero",
      "Procedimientos de limpieza y defensa de objetivos",
      "Espacio perfecto para aprender el ritmo del milsim",
    ],
  },
  recon: {
    kicker: "Elemento recon",
    title: "Informacion primero, contacto despues.",
    text: "Para quien prefiere observacion, infiltracion y designacion de objetivos antes de que la fuerza principal golpee.",
    image: "https://reforger.armaplatform.com/content/screenshots/version1.0/gun.jpg",
    alt: "Observador con rifle en Arma Reforger",
    points: [
      "Reconocimiento de rutas, spotting y overwatch",
      "Marcas de mapa, navegacion y comunicaciones limpias",
      "Ideal para jugadores pacientes y meticulosos",
    ],
  },
  apoyo: {
    kicker: "Logistica y apoyo",
    title: "Sin suministros ni evacuacion, nada aguanta.",
    text: "Una capa clave para mover recursos, sostener avances y mantener vivo el ritmo de las campanas grandes.",
    image: "https://cms-cdn.bistudio.com/cms-static--reforger/images/2c908d9c-39c7-41ca-b31e-ad8fc9c2d633-M21_ARTII_V1-Edit-Edit.jpg",
    alt: "Apoyo de fuego y combate en Arma Reforger",
    points: [
      "Conductores, medicos, helicrew y apoyo de fuego",
      "Cadena de suministros y reinsert de escuadras",
      "Rol ideal para quienes disfrutan coordinar el cuadro completo",
    ],
  },
};

function renderUnit(key) {
  const unit = unitContent[key];

  if (!unit || !unitImage || !unitKicker || !unitTitle || !unitText || !unitList) {
    return;
  }

  unitKicker.textContent = unit.kicker;
  unitTitle.textContent = unit.title;
  unitText.textContent = unit.text;
  unitImage.src = unit.image;
  unitImage.alt = unit.alt;
  unitList.innerHTML = unit.points.map((point) => `<li>${point}</li>`).join("");
}

unitTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    unitTabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    renderUnit(tab.dataset.unit);
  });
});
