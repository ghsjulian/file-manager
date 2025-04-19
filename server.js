// Requiring Packages....
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const PORT = process.env.SERVER_PORT;
const HOST = process.env.SERVER_HOST;
const publicPath = path.join(__dirname, "/public/");
const app = express();

// CORS Configuration...
const corsOptions = {
    origin: [
        "http://localhost:3000",
        "http://localhost:8158",
        "http://localhost:8000",
        "https://f245-2400-c600-531f-4078-00-1.ngrok-free.app"
    ], // Specify the allowed origin(s)
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow cookies to be sent with requests
    maxAge: 86400 // Cache preflight response for 1 day (in seconds)
};

// Use Middlewares...
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// Clear The Terminal...
console.clear();

// Create Mongoose Connection...
require("./configs/db.connection")();

// Requiring All The Routes...
const userRoutes = require("./routes/user.routes");
const fileRoutes = require("./routes/files.routes");

// Defined API Here...
app.use("/api", userRoutes);
app.use("/api", fileRoutes);

/*---------------------------------------------------------*/
/*---------------------------------------------------------*/
// Serve static files from the public folder
app.use("/css", express.static(publicPath + "css"));
app.use("/js", express.static(publicPath + "js"));
app.use("/icons", express.static(publicPath + "icons"));
app.use("/favicons", express.static(publicPath + "favicons"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serve The Files As Routes...
app.get("/", (req, res) => {
    res.sendFile(publicPath + "file-manager.html");
});
app.use("/signup", express.static(publicPath + "signup.html"));
app.use("/login", express.static(publicPath + "login.html"));
app.use("/file-manager", express.static(publicPath + "file-manager.html"));
app.use("/upload-files", express.static(publicPath + "upload-files.html"));
/*---------------------------------------------------------*/
/*---------------------------------------------------------*/

// Starting The Server...
app.listen(PORT, () => {
    console.log(`\n[+] Server Started -> http://${HOST}:${PORT}`);
});
