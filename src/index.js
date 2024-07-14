import "./style.css";

function importAll(r) {
  const images = {};
  r.keys().forEach((key) => {
    const path = key.replace("./", "");
    images[path] = r(key);
  });
  return images;
}

// Import all images and get the mapping of original paths to hashed paths
const images = importAll(
  require.context("./assets", false, /\.(png|jpe?g|svg)$/)
);

console.log("Images:", images);

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
