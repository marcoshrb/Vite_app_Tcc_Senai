import app from "./src/app.js";

const PORT = 3000;

const rotas = {
    "/": "node.js",
    "/a": "ads"
};

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
});
