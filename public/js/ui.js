
/*File More Option Button */
const moreBtn = document.querySelectorAll(".option");

moreBtn.forEach(btn => {
    btn.onclick = e => {
        e.preventDefault();
        const info = btn.parentElement.querySelector(".option-menu");
        info.style.display = "flex";
        info.querySelector(".close-option").onclick = e => {
            e.preventDefault();
            info.style.display = "none";
        };
        for (let i = 1; i < info.children.length; i++) {
            info.children[i].onclick = e => {
                e.preventDefault();
                info.style.display = "none";
                var action = info.children[i].getAttribute("class");
                switch (action) {
                    case "rename-file":
                        renameFile();
                        break;
                    case "share-file":
                        break;
                    case "download-file":
                        break;
                    case "delete-file":
                        break;
                    case "open-file":
                        break;
                    default:
                        break;
                }
            };
        }
    };
});

const renameFile = () => {
    const app = document.querySelector(".app");
    const form = document.querySelector(".app .form");
    form.style.display = "flex";
};
document.querySelector(".close-form").onclick = e => {
    e.preventDefault();
    const form = document.querySelector(".app .form");
    form.style.display = "none";
};
