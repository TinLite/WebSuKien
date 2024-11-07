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
const getViewAllEventPage = (req, res) => {
    res.render("viewAllEvent");
} 
export default {
  getHomePage,
  getAddEventPage,
  addEvent,
  getViewAllEventPage,
};
