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
const sourceImgs = document.querySelectorAll(`img[data-src]`);
const slider = document.querySelector(`.slider`);
const slides = document.querySelectorAll(`.slide`);
const sliderBtnR = document.querySelector(`.slider__btn--right`);
const sliderBtnL = document.querySelector(`.slider__btn--left`);
const dotContainer = document.querySelector(`.dots`);

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

const navbarHeight = navbar.getBoundingClientRect().height; // Calculating the nav height

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
// Tab switch functionality
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
// Reveal Section while scrolling functionality
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

//////////////////////////////////////////////////
// Lazy loading images functionality
//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-//
// The observer callback function to load images
const loadImgs = (entries, observer) => {
  const [entry] = entries; //getting the observer data
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src; //Switching the small image with the source (original size image)
  entry.target.addEventListener(
    `load`,
    (e) => entry.target.classList.remove(`lazy-img`) // REmoving the blur filter after fully loading the image
  );
  observer.unobserve(entry.target); //stoping the observer after loading all images
};
const obsLoadOptions = { root: null, threshold: 0, rootMargin: `200px` }; // Observer Properties
const imgsOpserver = new IntersectionObserver(loadImgs, obsLoadOptions); //creating the observer

sourceImgs.forEach((image) => imgsOpserver.observe(image)); //calling the observer on each image

//////////////////////////////////////////////////
// Images slider functionality
//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-//
let curSlide = 0; // To set the current Active slide
const maxSlide = slides.length - 1; // Getting the slide Num

const initSlider = function () {
  gotoSlide(0); // Setting the frist slide on the first load of the page
  createDots(); // Calling the fun to create the dots
  activateDot(0); // Setting the active dot to the first slide when first load the page
};

// It show the slide that should be active
const gotoSlide = function (slideNum) {
  slides.forEach(
    (slide, i) =>
      (slide.style.transform = `translateX(${100 * (i - slideNum)}%)`)
  );
};

// Activate the next slide
const nextSlide = function () {
  if (curSlide === maxSlide)
    curSlide = 0; // Reseting the slide to the frist when reaching to the last one
  else curSlide++; // Moving to the next slide

  gotoSlide(curSlide); // Showing\calling the next slide
  activateDot(curSlide); // Sitting the corresponding dot to the active silide
};

// Activate the Previous Slide
const previousSlide = function () {
  if (curSlide === 0) curSlide = maxSlide;
  //Going back to the last slide when reaching the frist one
  else curSlide--; // Moving to the Previous slide
  gotoSlide(curSlide); // Showing\calling the previous slide
  activateDot(curSlide); // Sitting the corresponding dot to the active silide
};

// Getting the next slide by clicking the right button element
sliderBtnR.addEventListener(`click`, nextSlide);

// Getting the previous slide by clicking the left button element
sliderBtnL.addEventListener(`click`, previousSlide);

// Creating the slide indicating dots
const createDots = function () {
  slides.forEach((_, i) =>
    dotContainer.insertAdjacentHTML(
      `beforeend`,
      `<button class="dots__dot" data-slide="${i}"></button>`
    )
  );
};

// Activating the corresponding dot
const activateDot = (slide) => {
  document
    .querySelectorAll(`.dots__dot`)
    .forEach((dot) => dot.classList.remove(`dots__dot--active`)); // Remove the active class from all the dots
  document
    .querySelector(`.dots__dot[data-slide = "${slide}"]`)
    .classList.add(`dots__dot--active`); // Activating the dot that corresponds to the active slide
};

// Activating the slide by clicking the dot that coresponds to it
dotContainer.addEventListener(`click`, (e) => {
  if (e.target.classList.contains(`dots__dot`)) {
    const { slide } = e.target.dataset;
    gotoSlide(slide);
    activateDot(slide);
  }
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
