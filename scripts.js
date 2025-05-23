window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.style.backgroundColor = "white";
  } else {
    header.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
  }
});
