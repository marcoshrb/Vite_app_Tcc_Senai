import express from "express";
import UserController from "../controllers/userController.js";

const routes = express.Router();

routes.get("/user", UserController.ListarUsers);
routes.get("/user/:id", UserController.ListaUserProId);
routes.post("/user", UserController.CadastraUser);
routes.post("/user/login", UserController.Login);
routes.post("/user/recover", UserController.RecoverPassword);
routes.post("/user/verify-code", UserController.VerifyCode);
routes.put("/user/:id", UserController.AtualizarUser);
routes.delete("/user/:id", UserController.DeletarUser);

export default routes;