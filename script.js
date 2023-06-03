const home = document.querySelector("#home-button");
const about = document.querySelector("#about-button");
const projects = document.querySelector("#projects-button");
const navButtons = document.querySelectorAll(".nav-button");
const homeDrawer = document.querySelector("#home-drawer");
const aboutDrawer = document.querySelector("#about-drawer");
const projectDrawer = document.querySelector("#project-drawer");
const navDrawers = document.querySelectorAll(".nav-drawer");

navButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const matchingDrawer = navDrawers[index];
    if (button.classList.contains("button-active")) {
      navButtons.forEach((btn) => btn.classList.remove("button-active"));
      navDrawers.forEach((drawer) => drawer.classList.remove("drawer-active"));
    } else {
      navButtons.forEach((btn) => btn.classList.remove("button-active"));
      navDrawers.forEach((drawer) => drawer.classList.remove("drawer-active"));
      button.classList.add("button-active");
      matchingDrawer.classList.add("drawer-active");
    }
  });
  button.addEventListener("mouseover", () => {
    if (!button.classList.contains("button-active")) {
      button.classList.add("button-hover");
    } else {
      button.classList.remove("button-hover");
    }
  });
  button.addEventListener("mouseleave", () => {
    button.classList.remove("button-hover");
  });
});
