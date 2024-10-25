import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/startUp", {
    useNewUrlParser: true,
});

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
         type: String,
         required: true,
         unique: true
    },
    password:{
        type: String,
        required: true
    }
});

const userModal = mongoose.model("User", userSchema);

export default userModal;