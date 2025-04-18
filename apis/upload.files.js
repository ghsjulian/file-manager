"use strict";

const input = document.querySelector("input");
const button = document.querySelector(".upload");

const uploadFiles = async data => {
    const token = localStorage.getItem("token") || null;
    const api = "http://localhost:3000/api/files/upload";
    try {
        const request = await fetch(api, {
            method: "POST",
            headers: {
                // "content-type": "application/json",
                Authorization: token
            },
            credentials: "include",
            body: data
        });
        const response = await request.json();
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

button.onclick = e => {
    e.preventDefault();
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
};
