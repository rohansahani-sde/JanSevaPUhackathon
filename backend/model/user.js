import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    name: String,
    email: {type:String, unique: true},
    password: String,
    role: { type: String, default: "citizen" }
})


module.exports = mongoose.model("User", UserSchema);
