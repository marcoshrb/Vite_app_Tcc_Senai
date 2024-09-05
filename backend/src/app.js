import express from "express";
import connectDatabase from "./config/bdConnect.js";
import routes from "./routes/index.js";
import cors from 'cors';

const conexao = await connectDatabase();
const app = express();

conexao.on("error", (erro) => {
    console.error("erro de conexão: ", erro);
});

conexao.once("open", () => {
    console.log("Conexão iniciada com sucesso");
});

app.use(express.json());
app.use(cors());
routes(app);

export default app;