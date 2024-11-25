import { Router } from "express";
import EventController from "../controllers/EventController.js";
import EventApiController from "../controllers/api/EventApiController.js";
import LoginApiController from "../controllers/api/LoginApiController.js";
import UserApiController from "../controllers/api/UserApiController.js";
import AuthController from "../controllers/AuthController.js";
import GroupController from "../controllers/GroupController.js";
import UserController from "../controllers/UserController.js";
import { middlewareJwtAuth, middlewareJwtFetchUser, middlewareSessionAdmin } from "../middlewares/MiddlewareAuth.js";
const router = Router();

export function initWebRoutes(app) {
  // API
  router.use("/api", middlewareJwtFetchUser);
  router.post("/api/login", LoginApiController.postLogin);
  router.post("/api/logout", middlewareJwtAuth, LoginApiController.postLogout);
  router.get(
    "/api/users/profile/:id?",
    middlewareJwtAuth,
    UserApiController.getProfile
  );
  router.post(
    "/api/user/changepassword",
    middlewareJwtAuth,
    UserApiController.changePassword
  );
  //API/User
  router.get(
    "/api/user/history",
    middlewareJwtAuth,
    UserApiController.getAllHistory
  );
  router.get(
    "/api/user/eventUpcoming",
    middlewareJwtAuth,
    UserApiController.getAllHistoryComingSoon
  );
  router.post(
    "/api/user/attendance/:eventId",
    middlewareJwtAuth,
    UserApiController.addAttendanceEvent
  );
  router.post(
    "/api/user/unattendance/:eventId",
    middlewareJwtAuth,
    UserApiController.unAttendanceEvent
  );
  router.get("/api/event", middlewareJwtAuth, UserApiController.getAllEvent);
  // API/Event
  router.post("/api/addevent", middlewareJwtAuth, EventApiController.addEvent);
  router.post(
    "/api/editevent",
    middlewareJwtAuth,
    EventApiController.editEvent
  );
  router.post(
    "/api/deleteevent",
    middlewareJwtAuth,
    EventApiController.deleteEvent
  );
  router.get(
    "/api/viewallevent",
    middlewareJwtAuth,
    EventApiController.getAllEvents
  );
  router.get(
    "/api/editevent/:id",
    middlewareJwtAuth,
    EventApiController.getEventById
  );
  router.get(
    "/api/geteventbyidcreater",
    middlewareJwtAuth,
    EventApiController.getEventByIdCreater
  );
  router.get("/api/users/profile/:id?", UserApiController.getProfile);
  router.get("/api/geteventbyid/:id?", EventApiController.getEventDetails);
  router.get("/api/event", EventApiController.getAllEvent);
  router.post("/api/lock/:id?", EventApiController.lockEvent);
  router.post("/api/unlock/:id?", EventApiController.unlockEvent);

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
  router.get("/addevent", EventController.getAddEventPage);
  router.post("/addevent", EventController.addEvent);
  router.post("/deleteevent", EventController.deleteEvent);
  router.get("/viewallevent", EventController.getViewAllEventPage);
  router.get("/editevent/:id", EventController.getEditEventPage);
  router.post("/editevent", EventController.editEvent);
  router.post("/markAttendance", EventController.markAttendance);
  router.post("/lockEvent", EventController.lockEvent);
  router.get("/detailevent/:id", EventController.getEventDetails);
  router.get("/event/:id/participants", EventController.getEventParticipants);

  app.use(router);
}
