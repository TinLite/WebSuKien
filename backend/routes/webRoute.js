import { Router } from "express";
import LoginApiController from "../controllers/api/LoginApiController.js";

const router = Router();

export function initWebRoutes(app) {

    router.post('/api/login', LoginApiController.postLogin);

    app.use(router);
};