import { Router } from "express";
import LoginApiController from "../controllers/api/LoginApiController.js";
import AdminController from "../controllers/AdminController.js";

const router = Router();

router.get("/user/add", AdminController.addUser);
router.get("/", AdminController.getHomePage);
router.get("/addevent", AdminController.getAddEventPage);
router.post("/addevent", AdminController.addEvent);
router.post("/deleteevent", AdminController.deleteEvent);
router.get("/viewallevent", AdminController.getViewAllEventPage);
router.get("/editevent/:id", AdminController.getEditEventPage);
router.post("/editevent", AdminController.editEvent);
export function initWebRoutes(app) {
  router.post("/api/login", LoginApiController.postLogin);

  app.use(router);
}