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
const tabContainer = document.querySelector(`.operations`);
const tabBtns = document.querySelectorAll(`.operations__tab`);
const tabsContent = document.querySelectorAll(`.operations__content`);
const sections = document.querySelectorAll(`.section`);

const navbarHeight = navbar.getBoundingClientRect().height; // Calculating the nav height

//////////////////////////////////////////////////
// Implementing scrolling to view
// >> for the first sectin only function
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

//////////////////////////////////////////////////
// Tab switch funcrionality
//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-//

//event o listen to the clicks in the tab buttons
tabContainer.addEventListener(`click`, (e) => {
  const target = e.target.closest(`.operations__tab`); //sepecifing the targeted button
  if (!target) return; //Guerd clause to prevent the error when Target value is null
  tabBtns.forEach((btn) => btn.classList.remove(`operations__tab--active`)); //looping over all buttons and remove the active class
  target.classList.add(`operations__tab--active`); //adding the active class to the clicked button
  tabsContent.forEach((content) =>
    content.classList.remove(`operations__content--active`)
  ); //looping over all contents and remove the active class
  document
    .querySelector(`.operations__content--${target.dataset.tab}`)
    .classList.add(`operations__content--active`); //adding the active class to the content that corresponds to the clicked button
});

//////////////////////////////////////////////////
// Reveal Section while scrolling funcrionality
//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-//
//Revealing the section handler as a callback
//function for the observer
const showSection = function (entries, observer) {
  const [entry] = entries; //Getting the observer data

  if (!entry.isIntersecting) return; //Guerd cluase to stop revealing section 1 while not intersacting

  entry.target.classList.remove(`section--hidden`); // revealing the section by removing the hidden class
  observer.unobserve(entry.target); // stoping the observer for tow resons
  // 1- We don't need it anymore since we show the section only on time
  // 2- This is also better performance-wise
};

// The observer properties
const showOptions = {
  root: null, //intersecting with the main window (Veiwport)
  threshold: 0.15, //Trigger the observer entry when the section intersect by 15%
};

//making the intersection Observer
const sectionsObserver = new IntersectionObserver(showSection, showOptions);

//looping through the section to call the observer and add the hidden class dynamically
sections.forEach((section) => {
  sectionsObserver.observe(section); // Calling the observer in to each section
  section.classList.add(`section--hidden`); //adding the hiding class dynamically
});

/////////////////////////////////////////////////
// Modal window
//Create account modal pop up
//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-//

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
