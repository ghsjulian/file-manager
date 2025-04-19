const navBtn = document.querySelector("#nav-btn");
const aside = document.querySelector("aside");
const closeNav = document.querySelector("#close-nav");
const closeBtn = document.querySelector("#nav-btn img");

navBtn.onclick = e => {
    e.preventDefault();
    aside.classList.toggle("mobile-menu");
    closeNav.classList.toggle("close-nav");
    let parts = closeBtn.src.split("/");
    let src = parts[parts.length - 1];
    if (src === "menu.png") {
        closeBtn.src = "/icons/close.png";
        closeBtn.style.width = "21px";
        closeBtn.style.height = "21px";
    } else {
        closeBtn.src = "/icons/menu.png";
        closeBtn.style.width = "25px";
        closeBtn.style.height = "25px";
    }
};
closeNav.onclick = e => {
    e.preventDefault();
    aside.classList.toggle("mobile-menu");
    closeNav.classList.toggle("close-nav");
    closeBtn.src = "/icons/menu.png";
        closeBtn.style.width = "25px";
        closeBtn.style.height = "25px";
    
};
