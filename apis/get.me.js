"use strict";

const getMe = async () => {
    const api = "http://localhost:3000/api/user/get-me";
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

getMe();
