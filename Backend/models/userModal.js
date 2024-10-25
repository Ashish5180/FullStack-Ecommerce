import mongoose from "mongoose";

// Connection URI
const uri = "mongodb+srv://ashishy8750:TKnsxblTgeeE0rJw@cluster0.up00m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Function to connect to MongoDB
const connectToDatabase = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
            socketTimeoutMS: 45000 // Close sockets after 45 seconds
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); // Exit process with failure
    }
};

connectToDatabase(); // Call the function to connect

// User schema definition
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// User model creation
const userModel = mongoose.model("User", userSchema);

export default userModel;
