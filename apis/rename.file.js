"use strict";

const renameFile = async () => {
    const api = "http://localhost:3000/api/files/rename-file";
    const token = localStorage.getItem("token") || null;
    const data = {
        filename:
            "http://localhost:3000/uploads/ghs--1744898405310-644299.jpg",
        newname: "file--1.jpeg"
    };
    try {
        const request = await fetch(api, {
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
    } catch (error) {
        console.log(error);
    }
};

renameFile();
