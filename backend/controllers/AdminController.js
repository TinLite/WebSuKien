import eventModel from "../models/EventModel.js";

const getHomePage = (req, res) => {
  res.render("home", { body: "user/list" });
};
const addUser = (req, res) => {
  res.render("home", { body: "user/add" });
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
};