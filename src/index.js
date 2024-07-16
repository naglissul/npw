import "./style.css";

function importAll(r) {
  const images = {};
  r.keys().forEach((key) => {
    const path = key.replace("./", "");
    images[path] = r(key);
  });
  return images;
}

const images = importAll(
  require.context("./assets", false, /\.(png|jpe?g|svg)$/)
);

console.log("Images:", images);

document.addEventListener("DOMContentLoaded", () => {
  // Some sketchy image src replacement after the webpack messed up with all the hashing paths...

  document.querySelectorAll("img").forEach((img) => {
    const src = img.getAttribute("src");
    const alt = img.getAttribute("alt");
    const child = document.createElement("img");
    child.src = src.substring(0, src.lastIndexOf("/")).replace("/../assets", "") + images[src.split("/").pop()];
    child.alt = alt;
    img.insertAdjacentElement("afterend", child);
    img.remove();
  });

  document.querySelectorAll(".folder-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const siblingUl = button.nextElementSibling;
      if (siblingUl) {
        siblingUl.classList.toggle("visible");
      }
    });
  });
});
