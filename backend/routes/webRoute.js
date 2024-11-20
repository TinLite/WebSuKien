import { Router } from "express";
import AdminController from "../controllers/AdminController.js";
import LoginApiController from "../controllers/api/LoginApiController.js";
import UserApiController from "../controllers/api/UserApiController.js";
import AuthController from "../controllers/AuthController.js";
import GroupController from "../controllers/GroupController.js";
import UserController from "../controllers/UserController.js";
import { middlewareJwtFetchUser, middlewareSessionAdmin } from "../middlewares/MiddlewareAuth.js";
const router = Router();

export function initWebRoutes(app) {
  // API
  router.use("/api", middlewareJwtFetchUser);
  router.post("/api/login", LoginApiController.postLogin);
  router.get("/api/users/profile/:id?", UserApiController.getProfile);

  //Login
  router.get("/login", AuthController.login);
  router.post("/login", AuthController.login);
  router.get("/logout", AuthController.logout);

  // middlewareSessionAdmin
  router.use("/", middlewareSessionAdmin);
  // User
  router.get("/user/add", UserController.addUser);
  router.post("/user/add", UserController.addUser);
  router.get("/", UserController.getHomePage);
  router.get("/search", UserController.searchUser);
  router.post("/user/unactive/:ID", UserController.unActiveUser);
  router.post("/user/active/:ID", UserController.activeUser);
  router.get("/user/update/:ID", UserController.updateUser);
  router.post("/user/update/:ID", UserController.updateUser);

  //Group
  router.get("/group", GroupController.getAllGroups);
  router.get("/group/add", GroupController.addGroup);
  router.post("/group/add", GroupController.addGroup);
  router.post("/group/unactive/:group_id", GroupController.unActiveGroup);
  router.post("/group/active/:group_id", GroupController.activeGroup);
  router.get("/group/search", GroupController.searchGroup);
  router.get("/group/update/:group_id", GroupController.updateGroup);
  router.post("/group/update/:group_id", GroupController.updateGroup);

  // Event
  router.get("/addevent", AdminController.getAddEventPage);
  router.post("/addevent", AdminController.addEvent);
  router.post("/deleteevent", AdminController.deleteEvent);
  router.get("/viewallevent", AdminController.getViewAllEventPage);
  router.get("/editevent/:id", AdminController.getEditEventPage);
  router.post("/editevent", AdminController.editEvent);

  app.use(router);
}
