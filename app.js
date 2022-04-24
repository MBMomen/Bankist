"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(`.btn--scroll-to`);
const section1 = document.querySelector(`#section--1`);
const navbar = document.querySelector(`.nav`);
const links = navbar.querySelectorAll(`.nav__link`);
//Scroll to section corresponding to the nav link
navbar.addEventListener(`click`, (e) => {
  e.preventDefault();
  const target = e.target.classList.contains(`nav__link`) ? e.target : false;

  target &&
    document
      .querySelector(`${target.getAttribute(`href`)}`)
      .scrollIntoView({ behavior: `smooth` });
});

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

navbar.addEventListener(`mouseover`, navHoverHandeler.bind(0.5));

navbar.addEventListener(`mouseout`, navHoverHandeler.bind(1));

// Scrolling to the first section by pressing read more link/btn
btnScrollTo.addEventListener(`click`, () =>
  section1.scrollIntoView({ behavior: `smooth` })
);

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
