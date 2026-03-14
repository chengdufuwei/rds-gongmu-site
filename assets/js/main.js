const tabLinks = [...document.querySelectorAll(".tab-link")];
const tabPanels = [...document.querySelectorAll(".tab-panel")];
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxCaption = document.querySelector(".lightbox-caption");
const galleryTriggers = [...document.querySelectorAll(".gallery-trigger")];

function activateTab(panelId, updateHash = true) {
  const resolvedPanelId = document.getElementById(panelId) ? panelId : "overview-panel";
  const target = document.getElementById(resolvedPanelId);
  if (!target) {
    return;
  }

  tabLinks.forEach((button) => {
    const isActive = button.dataset.tab === resolvedPanelId;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
    button.setAttribute("aria-controls", button.dataset.tab);
  });

  tabPanels.forEach((panel) => {
    const isActive = panel.id === resolvedPanelId;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
    panel.setAttribute("role", "tabpanel");
  });

  if (updateHash) {
    window.history.replaceState(null, "", `#${resolvedPanelId}`);
  }
}

tabLinks.forEach((button) => {
  button.setAttribute("role", "tab");
  button.addEventListener("click", () => {
    activateTab(button.dataset.tab);
  });
});

const initialHash = window.location.hash.replace("#", "");
activateTab(initialHash || "overview-panel", false);

window.addEventListener("hashchange", () => {
  const targetId = window.location.hash.replace("#", "");
  if (targetId) {
    activateTab(targetId, false);
  }
});

if (lightbox && typeof lightbox.showModal === "function") {
  galleryTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const image = trigger.dataset.image;
      const caption = trigger.dataset.caption || "";
      const currentImg = trigger.querySelector("img");

      if (!image || !currentImg) {
        return;
      }

      lightboxImage.src = image;
      lightboxImage.alt = currentImg.alt;
      lightboxCaption.textContent = caption;
      lightbox.showModal();
    });
  });
}
