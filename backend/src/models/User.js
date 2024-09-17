import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id : { type: mongoose.Schema.Types.ObjectId },
    nome : { type: String, required: true },
    email: { type: String, required: true, unique: true },
    recoveryCode: { type: String },
    codeExpires: { type: Date },
    senha : { type: String, required: true },
    adm : { type: Boolean, required: true }
}, { versionKey : false });

const user = mongoose.model("user", userSchema);

export default user;