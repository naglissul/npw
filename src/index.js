import "./content.md";

fetch("content.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("content").innerHTML = data;
  })
  .catch((error) => console.error("Error fetching markdown content:", error));
