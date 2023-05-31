const home = document.querySelector("#home-button");
const about = document.querySelector("#about-button");
const projects = document.querySelector("#projects-button");
const navButtons = document.querySelectorAll(".nav-button");


navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("nav-button-active")) {
        button.classList.remove("nav-button-active");
      } else {
        navButtons.forEach((other) => {
          other.classList.remove("nav-button-active");
        });
        button.classList.add("nav-button-active");
      }
    });
  });