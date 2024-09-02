import mongoose, {mongo} from "mongoose";

// user: adm
async function connectDatabase(){
    mongoose.connect("mongodb+srv://adm:adm123@cluster0.gaveg.mongodb.net/TccSenai?retryWrites=true&w=majority&appName=Cluster0");
    return mongoose.connection;   
};

export default connectDatabase;
