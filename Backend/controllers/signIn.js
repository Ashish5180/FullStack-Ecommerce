import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; 
import userModal from "../models/userModal.js";

const JWT_SECRET = "clothing-store"; // Replace with a strong secret key
const SALT_ROUNDS = 10; // Number of salt rounds for bcrypt

const signIn = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Missing email or password" });
    }

    let user = await userModal.findOne({ email });

    if (!user) {
        return res.status(400).json({ error: "User does not exist" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET);

    // Send JWT token in a secure HTTP-only cookie
    res.cookie("token", token);

    // Send user data along with success message
    res.json({
        message: "Logged in successfully",
        user: {
            id: user._id,
            email: user.email,
            name: user.username, // Include any other user fields you want to send
            // Add other fields as necessary
        },
    });
};

export default signIn;
