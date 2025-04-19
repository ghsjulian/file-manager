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

const detectFile = fileType => {
    switch (fileType) {
        case "txt":
            return "/icons/txt-1.png";
            break;
        case "pdf":
            return "/icons/pdf.png";
            break;
        case "doc":
            return "/icons/doc.png";
            break;
        case "mp4":
            return "/icons/mp4.png";
            break;
        case "mp3":
            return "/icons/mp3.png";
            break;
        case "ogg":
            return "/icons/ogg.png";
            break;
        case "bin":
            return "/icons/bin.png";
            break;
        default:
            break;
    }
};

const getFomatedDate = mongoDate => {
    const date = new Date(mongoDate);
    const day = String(date.getDate()).padStart(2, "0"); // Ensure two digits
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    // Format the date as DD/MM/YYYY
    return `${day}/${month}/${year}`;
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
            const ext = ["png", "jpg", "jpeg", "bmp", "gif"];

            if (ext.includes(getType(file))) {
                img.src = file;
            } else {
                img.src = detectFile(getType(file));
            }

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
            author.textContent = "Author : " + files.author;
            date.textContent = "Date : " + getFomatedDate(files.createdAt);

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
        if (response.files.files.length > 0) {
            updateUi(response.files);
        } else {
            fileList.innerHTML = `
                    <div class="col">
                    <h3 style='text-align : center'>No File Uploaded Yet !</h3>
                    </div>`;
        }
    } catch (error) {
        console.log(error);
        fileList.innerHTML = `
                    <div class="col">
                    <h3 style='text-align : center'>${error.message}</h3>
                    </div>`;
    }
};

window.onload = async () => {
    await fetchAllFiles();
    /*File More Option Button */
    const moreBtn = document.querySelectorAll(".option");
    const viewImg = document.querySelectorAll(".col");

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
                            shareFile(fileUrl);
                            break;
                        case "download-file":
                            downloadFile(fileUrl);
                            break;
                        case "delete-file":
                            deleteFile(btn, fileUrl);
                            break;
                        case "open-file":
                            openFile(fileUrl);
                            break;
                        default:
                            break;
                    }
                };
            }
        };
    });

    // View All Images...
    viewImg.forEach(col => {
        col.children[1].onclick = e => {
            e.preventDefault();
            openFile(col.children[1].src);
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
const deleteFile = async (btn, url) => {
    const element = btn.parentElement;

    try {
        const token = localStorage.getItem("token") || null;
        const request = await fetch(api + "/files/delete-file", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: token
            },
            credentials: "include",
            body: JSON.stringify({ file: url })
        });
        const response = await request.json();
        if (response.success) {
            element.remove();
        }
    } catch (error) {
        console.log(error);
    }
};
const shareFile = url => {};

const openVideo = url => {
    const viewForm = document.querySelector("#view-video");
    const video = document.querySelector("#video");
    video.src = url;
    viewForm.style.display = "flex";
};
const openAudio = url => {
    const viewForm = document.querySelector("#view-audio");
    const audio = document.querySelector("#audio");
    audio.src = url;
    viewForm.style.display = "flex";
};

const openFile = url => {
    const viewForm = document.querySelector("#view-img");
    const view = document.querySelector("#view");
    const ext = ["png", "jpg", "jpeg", "bmp", "gif"];
    if (ext.includes(getType(url))) {
        view.src = url;
        viewForm.style.display = "flex";
    } else if (getType(url) === "mp4") {
        openVideo(url);
    } else if (getType(url) === "mp3") {
        openAudio(url);
    } else {
        return;
    }
};
document.querySelector(".view-close-btn").onclick = e => {
    e.preventDefault();
    document.querySelector("#view-img").style.display = "none";
};
document.querySelector(".video-close").onclick = e => {
    e.preventDefault();
    document.querySelector("#view-video").style.display = "none";
};
document.querySelector(".audio-close").onclick = e => {
    e.preventDefault();
    document.querySelector("#view-audio").style.display = "none";
};

const downloadFile = url => {
    const a = document.createElement("a");
    a.setAttribute("download", getName(url));
    a.href = url;
    a.click();
};

document.querySelector(".close-form").onclick = e => {
    e.preventDefault();
    const form = document.querySelector(".app .form");
    form.style.display = "none";
};
