const navBtn = document.querySelector("#nav-btn");
const aside = document.querySelector("aside");
const closeNav = document.querySelector("#close-nav");

navBtn.onclick = e => {
    e.preventDefault();
    aside.classList.toggle("mobile-menu");
    closeNav.classList.toggle("close-nav");
};
closeNav.onclick = e => {
    e.preventDefault();
    aside.classList.toggle("mobile-menu");
    closeNav.classList.toggle("close-nav");
};
