"use strict";

// Native links remain useful with JavaScript disabled. The dialog adds an
// optional enlarged view while keeping the report position and keyboard focus.
const dialog = document.querySelector("#image-dialog");
const dialogImage = document.querySelector("#dialog-image");
const dialogCaption = document.querySelector("#dialog-caption");
const originalLink = document.querySelector("#dialog-original");
let lastTrigger = null;

if (dialog && typeof dialog.showModal === "function") {
  for (const link of document.querySelectorAll(".image-link")) {
    link.addEventListener("click", (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const image = link.querySelector("img");
      if (!image) return;
      event.preventDefault();
      lastTrigger = link;
      dialogImage.src = link.href;
      dialogImage.alt = image.alt;
      dialogCaption.textContent = link.closest("figure").querySelector("figcaption").textContent;
      originalLink.href = link.href;
      dialog.showModal();
    });
  }
  document.querySelector("#dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      const box = dialog.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
    }
  });
  dialog.addEventListener("close", () => lastTrigger?.focus());
}
