import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id : { type: mongoose.Schema.Types.ObjectId },
    nome : { type: String, required: true },
    cpf : { type: String, required: true },
    senha : { type: String, required: true },
    adm : { type: Boolean, required: true }
}, { versionKey : false });

const user = mongoose.model("user", userSchema);

export default user;