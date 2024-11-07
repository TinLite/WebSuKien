import { Router } from "express";
import LoginApiController from "../controllers/api/LoginApiController.js";
import AdminController from "../controllers/AdminController.js";
const router = Router();

router.get('/',AdminController.getHomePage);  
export function initWebRoutes(app) {
    router.post('/api/login', LoginApiController.postLogin);

    app.use(router);
};