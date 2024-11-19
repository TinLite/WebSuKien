import eventModel from "../models/EventModel.js";
import userModel from "../models/UserModel.js";
import bcrypt from "bcrypt";

const getHomePage = async (req, res) => {
  const users = await userModel.findAllUser();
  // console.log(users);
  res.render("home", { body: "user/list", row: users });
};
const addUser = async (req, res) => {
  if (req.method === "GET") {
    return res.render("home", { body: "user/add" });
  } else {
    const data = req.body;
    data.password = await bcrypt.hash(data.password, 10);
    const result = await userModel.addUser(data);
    console.log(result);
    return res.redirect("/");
  }
};
const unActiveUser = async (req, res) => {
  const ID = req.params.ID;
  await userModel.unActiveUser(ID);
  return res.redirect("/");
};
const activeUser = async (req, res) => {
  const ID = req.params.ID;
  await userModel.activeUser(ID);
  return res.redirect("/");
};
const updateUser = async (req, res) => {
  const id = req.params.ID;
  if (req.method === "GET") {
    const [user] = await userModel.getOneUser(id);
    console.log(user);
    return res.render("home", { body: "user/update", row: user });
  } else {
    const data = req.body;
    data.id = id;
    if (!data.password || data.password === "") {
      const [user] = await userModel.getOneUser(id);
      data.password = user.password;
      // console.log(data.password);
    } else {
      data.password = await bcrypt.hash(data.password, 10);
      // console.log(data.password);
    }
    const result = await userModel.updateUser(data);
    console.log(result);
    return res.redirect("/");
  }
};

const getAddEventPage = (req, res) => {
  res.render("addEvent");
};
const addEvent = async (req, res) => {
  const data = req.body;
  // lấy id người dùng đã đăng nhập trong session
  data.idCreator = 1;
  await eventModel.addEvent(data);
  return res.redirect("/viewAllEvent");
};
const deleteEvent = async (req, res) => {
  const data = req.body;
  await eventModel.deleteEvent(data);
  return res.redirect("/viewAllEvent");
};
const getViewAllEventPage = async (req, res) => {
  const { find } = req.query;
  let data;
  if (find) {
    [data] = await eventModel.getEventByName(find);
  } else {
    [data] = await eventModel.getAllEvent();
  }
  res.render("viewAllEvent", { data: { listEvent: data } });
};
const getEditEventPage = async (req, res) => {
  const { id } = req.params;
  let [event] = await eventModel.getEventByID(id);
  event = event[0];
  event.reg_deadline = new Date(event.reg_deadline)
    .toISOString()
    .substring(0, 10);
  event.occasion_date = new Date(event.occasion_date)
    .toISOString()
    .substring(0, 10);
  res.render("editEvent", { data: { event: event } });
};
const editEvent = async (req, res) => {
  const data = req.body;
  await eventModel.editEvent(data);
  return res.redirect("/viewAllEvent");
};
export default {
  getHomePage,
  addUser,
  getAddEventPage,
  addEvent,
  getViewAllEventPage,
  deleteEvent,
  getEditEventPage,
  editEvent,
  unActiveUser,
  activeUser,
  updateUser,
};
