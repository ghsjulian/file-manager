import { api } from "./api.js";
const uploadBtn = document.querySelector(".upload-btn");
const msg = document.querySelector("#msg");
const loader = document.querySelector("#loader");
const loading = document.querySelector("#loading");
const input = document.querySelector("input");

const showMsg = (text, type) => {
    if (type) {
        msg.classList.add("success");
        msg.textContent = text;
    } else {
        msg.classList.add("error");
        msg.textContent = text;
    }
    setTimeout(() => {
        msg.textContent = "";
        msg.removeAttribute("class");
    }, 3000);
};

const uploadFiles = async data => {
    const token = localStorage.getItem("token") || null;
    loader.classList.add("loader");
    loading.textContent = "Uploading...";
    try {
        const request = await fetch(api + "/files/upload", {
            method: "POST",
            headers: {
                Authorization: token
            },
            credentials: "include",
            body: data
        });
        const response = await request.json();
        if (response.success) {
            showMsg(response.message, response.success);
            loader.classList.remove("loader");
            loading.textContent = "Upload Now";
            setTimeout(() =>{
                window.location.href="/file-manager"
            }, 3000);
        } else {
            showMsg(response.message, response.success);
            loader.classList.remove("loader");
            loading.textContent = "Upload Now";
        }
    } catch (error) {
        showMsg(error.message, false);
        loader.classList.remove("loader");
        loading.textContent = "Upload Now";
    }
};
uploadBtn.onclick = e => {
    e.preventDefault();
    if (input.files.length > 0) {
        const files = input.files;
        const formdata = new FormData();
        formdata.append("name", "Ghs Julian");

        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                formdata.append(`files`, files[i]);
            }
        } else {
            formdata.append("files", files[0]);
        }
        uploadFiles(formdata);
    } else {
        showMsg("Please Select A File !", false);
    }
};
