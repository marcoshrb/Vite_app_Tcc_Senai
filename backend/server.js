import "dotenv/config";
import express from 'express';
import cors from 'cors'; // Corrigido para import
import app from "./src/app.js";

const PORT = 3000;

// Middleware para permitir CORS
app.use(cors({
    origin: '*', // Permite qualquer origem, ajuste conforme necessário
    preflightContinue: false,
    methods: "GET,POST,PUT,DELETE",
    optionsSuccessStatus: 204
}));

// Middleware para analisar o corpo das solicitações
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Servidor ouvindo em http://localhost:${PORT}`);
});
