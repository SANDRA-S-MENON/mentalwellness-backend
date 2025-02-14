const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")

const userModel = require("./models/users"); // Adjust path to your model




let app =express()
app.use(express.json())
app.use(cors())
mongoose.connect("mongodb+srv://sandras02:sandrasmenon@cluster0.3g103sn.mongodb.net/mentalwellness?retryWrites=true&w=majority&appName=Cluster0")



const generateHashedpassword=async (password)=>{
    const salt=await bcryptjs.genSalt(10)
     return bcryptjs.hash(password,salt)
}


// --user sign up api --

app.post("/signup", async (req, res) => {
    const { FullName, Email, Phone, Age, Gender, Course, College, Username, Password, Confirmpassword } = req.body;

    // Validation
    if (!FullName || !Email || !Username || !Password || !Confirmpassword) {
        return res.status(400).json({ message: "Please provide all required fields." });
    }

    // Check if password and confirm password match
    if (Password !== Confirmpassword) {
        return res.status(400).json({ message: "Passwords do not match." });
    }

    try {
        // Check if the username or email already exists
        const existingUser = await userModel.findOne({ $or: [{ Email }, { Username }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username or Email already exists." });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(Password, 10);

        // Create a new user
        const newUser = new userModel({
            FullName,
            Email,
            Phone,
            Age,
            Gender,
            Course,
            College,
            Username,
            Password: hashedPassword,
            Confirmpassword: hashedPassword // You may want to remove this after hashing Password
        });

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Server error" });
    }
});
// start the server
app.listen(3030,()=>{
    console.log("server started")
})