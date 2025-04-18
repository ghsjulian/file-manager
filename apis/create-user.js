"use strict";

const createUser = async () => {
    const api = "http://localhost:3000/api/user/create-user";
    const user = {
        name: "Ghs Julian",
        email: "ghsjulian@gmail.com",
        password: "123456"
    };
    try {
        const request = await fetch(api, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(user)
        });
        const response = await request.json();
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

createUser();
