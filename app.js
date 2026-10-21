// Интерактивность первой версии сайта «Лагерь».
// Здесь намеренно используются обычный JavaScript и небольшие функции без библиотек.

const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");
const navLinks = document.querySelectorAll(".primary-nav a");
const filterButtons = document.querySelectorAll(".filter-button");
const eventCards = document.querySelectorAll(".event-card");
const joinButton = document.querySelector("#join-button");
const toast = document.querySelector("#toast");

let toastTimer;

function showMessage(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");

  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 3200);
}

// Открывает и закрывает мобильную навигацию.
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Открыть меню" : "Закрыть меню");
  primaryNav.classList.toggle("is-open", !isOpen);
});

// После выбора раздела на телефоне закрываем выпадающее меню.
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Открыть меню");
    primaryNav.classList.remove("is-open");
  });
});

// Фильтр показывает все события или только выбранную категорию.
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const isSelected = item === button;
      item.classList.toggle("is-active", isSelected);
      item.setAttribute("aria-pressed", String(isSelected));
    });

    eventCards.forEach((card) => {
      const shouldShow = selectedFilter === "all" || card.dataset.category === selectedFilter;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

// Пока у сообщества нет настоящей ссылки-приглашения, объясняем это вместо перехода на фальшивый адрес.
joinButton.addEventListener("click", () => {
  showMessage("Добавим сюда настоящую ссылку-приглашение, когда определимся с платформой сервера.");
});

// Здесь позже можно подключить реальный сервер, API и данные сообщества.
