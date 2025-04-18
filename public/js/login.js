import { api } from "./api.js";
const msg = document.querySelector("#msg");
const loading = document.querySelector("#loading");
const loader = document.querySelector("#loader");
const button = document.querySelector(".login-btn");

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
const isValue = (email, password) => {
    if (email === "") {
        showMsg("Email Is Required", false);
        return false;
    } else if (password === "") {
        showMsg("Password Is Required", false);
        return false;
    } else if (password.trim().length < 6) {
        showMsg("Password Will Be 6 Characters", false);
        return false;
    } else {
        return true;
    }
};
button.onclick = async e => {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    e.preventDefault();
    if (!isValue(email, password)) return;
    try {
        loader.classList.add("loader");
        loading.textContent = "Processing...";
        const request = await fetch(`${api}/user/login-user`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const response = await request.json();
        if(response.success){
            localStorage.setItem("token", response.user.token);
        localStorage.setItem("id", response.user.id);
        loader.classList.remove("loader");
        loading.textContent = "Login Now";
        showMsg(response.message, response.success);
        setTimeout(()=> {
            window.location.href="/file-manager"
        }, 3000);
        }else{
        loader.classList.remove("loader");
        loading.textContent = "Login Now";
        showMsg(response.message, response.success);
        }
    } catch (error) {
        loader.classList.remove("loader");
        loading.textContent = "Login Now";
        showMsg(error.message, false);
    }
};
