import express from "express";
import connectDatabase from "./config/bdConnect.js";

const conexao = await connectDatabase();

conexao.on("error", (erro) => {
    console.error("erro de conexão: ", erro);
});

conexao.once("open", () => {
    console.log("Conexão iniciada com sucesso");
});

const app = express();
app.use(express.json());

function buscaAss(id)
{
    return asses.findIndex(ass =>{
        return ass.id === Number(id);
    })
}
app.get("/", (req, res) => {
    res.status(200).send("Node.js");
});

app.get("/ass", (req, res) => {
    res.status(200).json(asses);
});

app.get("/ass/:id", (req, res) => {
    const index = buscaAss(req.params.id);
    res.status(200).json(asses[index]);
});

app.post("/ass", (req, res) => {
    asses.push(req.body)
    res.status(201).send("Ass cadastrado!")
});

app.put("/ass/:id", (req, res) => {
    const index = buscaAss(req.params.id);
    asses[index].id = req.body.id;
    res.status(200).json(asses);
});

app.delete("ass/:id", (req, res) => {
    const index = buscaAss(req.params.id)
    asses.splice(index, 1);
    res.status(200).send("Ass deletado!")
});

export default app;