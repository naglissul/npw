import "./logo.png";
import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".folder-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const siblingUl = button.nextElementSibling;
      if (siblingUl) {
        siblingUl.classList.toggle("visible");
      }
    });
  });
});
