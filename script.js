const home = document.querySelector("#home-button");
const about = document.querySelector("#about-button");
const projects = document.querySelector("#projects-button");
const navButtons = document.querySelectorAll(".nav-button");
const homeDrawer = document.querySelector("#home-drawer");
const aboutDrawer = document.querySelector("#about-drawer");
const projectDrawer = document.querySelector("#project-drawer");
const navDrawers = document.querySelectorAll(".nav-drawer");
const cards = document.querySelectorAll('.card');
// const cards = document.querySelectorAll('.card-description');
const cardBacks = document.querySelectorAll('.card-back');

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


// cards.forEach(card =>{
//   const shadow = card.parentElement.parentElement.previousElementSibling;
//   const content = card.parentElement.parentElement.previousElementSibling.nextElementSibling;
//   const back = card.parentElement.nextElementSibling;

//   console.log(back)
//   card.addEventListener('click', ()=>{
//     shadow.classList.add('card-clicked')
//     content.classList.add('card-clicked')
//     // back.classList.add('card-clicked')
//   })
// })

cards.forEach(card=>{
  const shadow = card.children[0]
  const content = card.children[1]
  const back = card.children[1].children[1]
  const description = card.children[1].children[0].children[1]
  description.addEventListener('click',()=>{
    shadow.classList.toggle('card-clicked')
    content.classList.toggle('card-clicked')
  })
  back.addEventListener('click',()=>{
    shadow.classList.toggle('card-clicked')
    content.classList.toggle('card-clicked')

  })
})