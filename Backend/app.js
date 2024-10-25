import express from "express";
import signIn from "./controllers/signIn.js";
import signUp from "./controllers/signUp.js";
import cookieParser from 'cookie-parser';
import cors from 'cors'; // Import the cors package


const app = express();
app.use(cookieParser());
app.use(cors({
    origin: 'https://full-stack-ecommerce-gold.vercel.app',
    credentials: true, // Allows cookies to be sent with requests
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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
