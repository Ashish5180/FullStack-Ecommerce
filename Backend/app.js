import express from "express";
import cookieParser from 'cookie-parser';
import signIn from "./controllers/signIn.js";
import signUp from "./controllers/signUp.js";

import cors from 'cors'; // Import the cors package


const app = express();
const corsOptions = {
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Use CORS middleware
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get("/", (req, res) => {
    res.send("Server is running");
})

// Signup route with password hashing and sending JWT token in cookie
app.post("/signup", signUp);

// Sign-in route with password comparison and sending JWT token in cookie
app.post("/signin",signIn);






// Logout route to clear the JWT token cookie
app.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
});

// Server
app.listen(8000, () => console.log(`Server is running on port 8000`));
