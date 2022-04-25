"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(`.btn--scroll-to`);
const section1 = document.querySelector(`#section--1`);
const navbar = document.querySelector(`.nav`);
const links = navbar.querySelectorAll(`.nav__link`);
const header = document.querySelector(`.header`);

const navbarHeight = navbar.getBoundingClientRect().height; // Calculating the nav height

//////////////////////////////////////////////////
// Implementing scrolling to view  >for the first
// sectin only function
//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-//
// Scrolling to the first section by pressing read more link/btn
btnScrollTo.addEventListener(`click`, () =>
  section1.scrollIntoView({ behavior: `smooth` })
);

//////////////////////////////////////////////////
// Implementing the Hovering effect to the nav
//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-//
//Handel the hovering effect for the nav links
const navHoverHandeler = function (e) {
  const target = e.target.classList.contains(`nav__link`) ? e.target : false;

  if (target) {
    const logo = target.closest(`.nav`).querySelector(`img`);
    links.forEach((link) => {
      if (link != target) link.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

//hovring nav links change style event
navbar.addEventListener(`mouseover`, navHoverHandeler.bind(0.5));
//bit hovring nav links reset style event
navbar.addEventListener(`mouseout`, navHoverHandeler.bind(1));

//////////////////////////////////////////////////
// Implementing dynamic scrollToView nav links
//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-//
//Scroll to section corresponding to the nav link
navbar.addEventListener(`click`, (e) => {
  e.preventDefault();
  const target = e.target.classList.contains(`nav__link`) ? e.target : false;
  const id = target.getAttribute(`href`);
  target && document.querySelector(id).scrollIntoView({ behavior: `smooth` });
});

//////////////////////////////////////////////////
// Implementing the sticky nav function
//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-//
// Togaling sticky bar class
const stickyNavHandler = function (entries) {
  const [entry] = entries; // the observer trigger data
  console.log(entry);
  if (!entry.isIntersecting) navbar.classList.add(`sticky`);
  else navbar.classList.remove(`sticky`);
};

// The observer options
const obsOptions = {
  root: null, //Null meaning we tracking the intersection with Window (viewport)
  threshold: 0,
  rootMargin: `-${navbarHeight}px`,
};

// Creating a observer to track the intersaction between our target (header)
// and the element it should intersect with (Window/Viewport)
const headerObserver = new IntersectionObserver(stickyNavHandler, obsOptions);

// Initilizing the observer with the header as a target element
headerObserver.observe(header);

///////////////////////////////////////
// Modal window
//Create account modal pop up

//open modal
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
//close modal
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

//opening the modal and closing use click and Escape Key
for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
