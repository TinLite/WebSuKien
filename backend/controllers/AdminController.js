import eventModel from "../models/EventModel";
const getHomePage = (req, res) => {
  res.render("home");
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
  const [data] = await eventModel.getAllEvent();
  res.render("viewAllEvent", { data: { listEvent: data } });
};
const getEditEventPage = async (req, res) => {
  const { id } = req.params;
  const [event] = await eventModel.getEventByID(id);
  console.log(event);
  res.render("editEvent", { data: { event: event[0] } });
};
export default {
  getHomePage,
  getAddEventPage,
  addEvent,
  getViewAllEventPage,
  deleteEvent,
  getEditEventPage,
};
