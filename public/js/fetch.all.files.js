import { api } from "./api.js";
const fileList = document.querySelector(".file-list");

const getName = file => {
    let parts = file.split("/");
    return parts[parts.length - 1];
};
const getType = file => {
    let parts = file.split("/");
    let name = parts[parts.length - 1].split(".");
    return name[1];
};

const updateRenameOnUi = (element, newName) => {
    let name = getName(newName);
    const root = element.parentElement;
    const finalRoot = root.children[2];
    finalRoot.children[0].textContent = name;
};

const updateUi = files => {
    var index = 1;
    if (files.files.length > 0) {
        files.files.forEach(file => {
            const col = document.createElement("div");
            const optionMenu = document.createElement("div");
            const img = document.createElement("img");
            const fileInfo = document.createElement("div");
            const button = document.createElement("button");

            col.className = "col";
            optionMenu.className = "option-menu";
            fileInfo.className = "file-info";
            button.className = "option";
            button.textContent = "...";
            img.src = file;

            const closeBtn = document.createElement("button");
            const openFile = document.createElement("span");
            const renameFile = document.createElement("span");
            const shareFile = document.createElement("span");
            const deleteFile = document.createElement("span");
            const downloadFile = document.createElement("span");

            const fileName = document.createElement("span");
            const fileType = document.createElement("span");
            const author = document.createElement("span");
            const date = document.createElement("span");

            fileName.setAttribute("id", "ghs-" + index);
            fileName.textContent = "File Name : " + getName(file);
            fileType.textContent = "File Type : " + getType(file);
            author.textContent = "Author : " + files.id;
            date.textContent = "Date : 12/05/2025";

            fileInfo.appendChild(fileName);
            fileInfo.appendChild(fileType);
            fileInfo.appendChild(author);
            fileInfo.appendChild(date);

            openFile.setAttribute("url", file);
            renameFile.setAttribute("url", file);
            deleteFile.setAttribute("url", file);
            shareFile.setAttribute("url", file);
            downloadFile.setAttribute("url", file);

            closeBtn.className = "close-option";
            openFile.className = "open-file";
            renameFile.className = "rename-file";
            deleteFile.className = "delete-file";
            shareFile.className = "share-file";
            downloadFile.className = "download-file";

            closeBtn.textContent = "X";
            openFile.innerHTML = "<img src='icons/open.png' /> Open File";
            renameFile.innerHTML =
                "<img src='icons/new-document.png' /> Rename File";
            deleteFile.innerHTML = "<img src='icons/delete.png' /> Delete File";
            shareFile.innerHTML = "<img src='icons/share.png' /> Share-file";
            downloadFile.innerHTML =
                "<img src='icons/download.png' /> Download File";

            optionMenu.appendChild(closeBtn);
            optionMenu.appendChild(openFile);
            optionMenu.appendChild(renameFile);
            optionMenu.appendChild(deleteFile);
            optionMenu.appendChild(shareFile);
            optionMenu.appendChild(downloadFile);

            col.appendChild(optionMenu);
            col.appendChild(img);
            col.appendChild(fileInfo);
            col.appendChild(button);

            fileList.appendChild(col);
            index += 1;
        });
    }
};
const fetchAllFiles = async () => {
    const token = localStorage.getItem("token") || null;
    try {
        const request = await fetch(api + "/files/all-files", {
            method: "GET",
            headers: {
                "content-type": "application/json",
                Authorization: token
            },
            credentials: "include"
        });
        const response = await request.json();
        if (response.success) {
            updateUi(response.files);
        }
    } catch (error) {
        console.log(error);
    }
};

window.onload = async () => {
    await fetchAllFiles();
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
                    var fileUrl = info.children[i].getAttribute("url");
                    var action = info.children[i].getAttribute("class");
                    switch (action) {
                        case "rename-file":
                            renameFile(info.children[i], btn, fileUrl);
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
};

const renameFile = (option, btn, url) => {
    const app = document.querySelector(".app");
    const form = document.querySelector(".app .form");
    const msg = document.querySelector("#msg");
    const renameBtn = document.querySelector(".rename-btn");
    const loader = document.querySelector("#loader");
    const loading = document.querySelector("#loading");
    form.style.display = "flex";
    const parts = url.split("/");
    const currentName = parts[parts.length - 1];
    document.querySelector("#filename").value = currentName;

    renameBtn.onclick = async () => {
        const newname = document.querySelector("#filename").value;
        const data = {
            filename: url,
            newname
        };

        if (newname) {
            try {
                renameBtn.disable = true;
                loader.classList.add("loader");
                loading.textContent = "Please Wait...";

                const token = localStorage.getItem("token") || null;
                const request = await fetch(api + "/files/rename-file", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        Authorization: token
                    },
                    credentials: "include",
                    body: JSON.stringify(data)
                });
                const response = await request.json();
                console.log(response);
                if (response.success) {
                    loader.classList.remove("loader");
                    loading.textContent = "Renamed Success";
                    msg.textContent = response.message;
                    msg.classList.add("success");
                    document.querySelector("#filename").value = "";
                    renameBtn.disable = false;
                    setTimeout(() => {
                        loading.textContent = "Rename File";
                        msg.textContent = "";
                        msg.classList.remove("success");
                        const form = document.querySelector(".app .form");
                        form.style.display = "none";
                        option.setAttribute("url", response.newname);
                        updateRenameOnUi(btn, response.newname);
                    }, 500);
                } else {
                    loader.classList.remove("loader");
                    loading.textContent = "Renamed Failed";
                    msg.textContent = response.message;
                    msg.classList.add("error");
                    renameBtn.disable = false;
                }
            } catch (error) {
                console.log(error);
                msg.textContent = error.message;
                msg.classList.add("error");
                loader.classList.remove("loader");
                loading.textContent = "Rename File";
                renameBtn.disable = false;
            }
        } else {
            msg.textContent = "Please Enter File Name !";
            msg.classList.add("error");
        }
        setTimeout(() => {
            msg.textContent = "";
            msg.classList.remove("error");
        }, 3000);
    };
};
document.querySelector(".close-form").onclick = e => {
    e.preventDefault();
    const form = document.querySelector(".app .form");
    form.style.display = "none";
};
