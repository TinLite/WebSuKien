import { Router } from "express";
import LoginApiController from "../controllers/api/LoginApiController.js";
import AdminController from "../controllers/AdminController.js";
import AuthController from "../controllers/AuthController.js";
import GroupController from "../controllers/GroupController.js";
import { middlewareJwtFetchUser } from "../middlewares/MiddlewareAuth.js";
import { middlewareSessionAdmin } from "../middlewares/MiddlewareAuth.js";
const router = Router();

export function initWebRoutes(app) {
  // API
  router.use("/api", middlewareJwtFetchUser);
  router.post("/api/login", LoginApiController.postLogin);

  //Login
  router.get("/login", AuthController.login);
  router.post("/login", AuthController.login);
  router.get("/logout", AuthController.logout);

  // middlewareSessionAdmin
  router.use("/", middlewareSessionAdmin);
 // User
  router.get("/user/add", AdminController.addUser);
  router.post("/user/add", AdminController.addUser);
  router.get("/", AdminController.getHomePage);
  router.get("/search", AdminController.searchUser);
  router.post("/user/unactive/:ID", AdminController.unActiveUser);
  router.post("/user/active/:ID", AdminController.activeUser);
  router.get("/user/update/:ID", AdminController.updateUser);
  router.post("/user/update/:ID", AdminController.updateUser);

  //Group
  router.get("/group", GroupController.getAllGroups);

  router.get("/group/add", GroupController.addGroup);
  router.post("/group/add", GroupController.addGroup);
  // Event
  router.get("/addevent", AdminController.getAddEventPage);
  router.post("/addevent", AdminController.addEvent);
  router.post("/deleteevent", AdminController.deleteEvent);
  router.get("/viewallevent", AdminController.getViewAllEventPage);
  router.get("/editevent/:id", AdminController.getEditEventPage);
  router.post("/editevent", AdminController.editEvent);

  app.use(router);
}
