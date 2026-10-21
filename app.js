// Настрой ссылки, когда игровой сервер будет готов.
const SERVER_ADDRESS = "";
const COMMUNITY_INVITE_URL = "";

const menuToggle = document.querySelector("#menu-toggle");
const primaryNav = document.querySelector("#primary-nav");
const toast = document.querySelector("#toast");
const joinButton = document.querySelector("#join-button");
const footerYear = document.querySelector("#footer-year");

let toastTimeout;

if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 3200);
}

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Открыть меню" : "Закрыть меню");
    primaryNav.classList.toggle("is-open", !isOpen);
  });

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Открыть меню");
      primaryNav.classList.remove("is-open");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Открыть меню");
      primaryNav.classList.remove("is-open");
    }
  });
}

if (joinButton) {
  joinButton.addEventListener("click", async () => {
    if (COMMUNITY_INVITE_URL) {
      window.open(COMMUNITY_INVITE_URL, "_blank", "noopener,noreferrer");
      return;
    }

    if (SERVER_ADDRESS && navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(SERVER_ADDRESS);
        showToast("Адрес сервера скопирован. До встречи в мире!");
        return;
      } catch (error) {
        // The fallback message below still tells the visitor what is missing.
      }
    }

    showToast("Скоро здесь появятся адрес сервера и приглашение в сообщество.");
  });
}

// 3D blocks are decorative. Pause their motion when a visitor prefers reduced motion.
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("reduce-motion");
}