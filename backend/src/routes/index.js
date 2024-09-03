import express from "express";
import users from "./userRoutes.js";

const routes = (app) => {
    app.use(express.json(), users)
};

export default routes;