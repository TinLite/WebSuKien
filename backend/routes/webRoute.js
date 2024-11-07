import { Router } from "express";
import LoginApiController from "../controllers/api/LoginApiController.js";
import AdminController from "../controllers/AdminController.js";

const router = Router();

router.get("/", AdminController.getHomePage);
router.get("/addevent", AdminController.getAddEventPage);
router.post("/addevent", AdminController.addEvent);
router.get("/viewallevent", AdminController.getViewAllEventPage);
export function initWebRoutes(app) {
  router.post("/api/login", LoginApiController.postLogin);

  app.use(router);
}
