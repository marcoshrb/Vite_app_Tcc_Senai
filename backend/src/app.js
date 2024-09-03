import express from "express";
import connectDatabase from "./config/bdConnect.js";
import routes from "./routes/index.js";

const conexao = await connectDatabase();

conexao.on("error", (erro) => {
    console.error("erro de conexão: ", erro);
});

conexao.once("open", () => {
    console.log("Conexão iniciada com sucesso");
});

const app = express();
routes(app);

export default app;