const mongoose=require("mongoose")


const userSchema =mongoose.Schema(
    {
        FullName: { type: String, required: true },
        Email: { type: String, required: true, unique: true },
        Phone: { type: String, required: false },
        Age: { type: Number, required: false },
        Gender: { type: String, enum: ["male", "female", "other", "prefer not to say"], required: false },
        Course: { type: String, required: true },
        College: { type: String, required: true },
        Username: { type: String, required: true, unique: true },
        Password: { type: String, required: true },
        Confirmpassword: { type: String, required: true }

    }
)


var userModel=mongoose.model("users",userSchema)
module.exports=userModel