"use strict";

const getFiles = async () => {
    const api = "http://localhost:3000/api/files/all-files";
    const token = localStorage.getItem("token") || null;
    try {
        const request = await fetch(api, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                Authorization: token
            },
            credentials: "include"
        });
        const response = await request.json();
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

getFiles();
