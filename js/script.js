console.log("Hello World!");

let mobileMenuEl = document.querySelector(".btn-mobile-nav");
let headerEl = document.querySelector(".header");

mobileMenuEl.addEventListener("click", () => {
  headerEl.classList.toggle("nav-open");
});

//close mobile nav on click of a link in the NAVBAR
let navlinks = document.querySelectorAll(".main-nav-list .main-nav-link");

navlinks.forEach((x) => {
  x.addEventListener("click", () => {
    headerEl.classList.remove("nav-open");
  });
});

//Smooth scrolling

let allLinks = document.querySelectorAll("a:link");

allLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    let href = link.getAttribute("href");

    if (href === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else if (href !== "#" && href.startsWith("#")) {
      let sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Set current year
let yearEl = document.querySelector(".year");
yearEl.textContent = new Date().getFullYear();

//Sticky Navigation
let sectionHeroEl = document.querySelector(".section-hero");

let observer = new IntersectionObserver(
  function (entries) {
    let entry = entries[0];
    if (!entry.isIntersecting) {
      document.querySelector(".header").classList.add("sticky");
      document
        .querySelector(".section-hero")
        .classList.add("section-hero--sticky-fix");
    } else {
      document.querySelector(".header").classList.remove("sticky");
      document
        .querySelector(".section-hero")
        .classList.remove("section-hero--sticky-fix");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px", //equal to the height set on the sticky navbar... prevents overlapping of the navbar on featured-in section.
  }
);
observer.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
