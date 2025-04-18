"use strict";
const login = document.querySelector(".login")

const loginUser = async () => {
    const api = "http://localhost:3000/api/user/login-user";
    const user = {
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
        localStorage.setItem("token",response.user.token)
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

login.onclick=(e)=>{
    e.preventDefault()
    loginUser()
}