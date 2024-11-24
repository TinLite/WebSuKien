import e from "express";
import eventModel from "../models/EventModel.js";

const getAddEventPage = (req, res) => {
  res.render("addEvent");
};
const addEvent = async (req, res) => {
  const data = req.body;
  // lấy id người dùng đã đăng nhập trong session

  data.idCreator = req.session.user.userId;
  const [row] = await eventModel.addEvent(data);
  if (!data.group_id) {
    return res.redirect("/viewAllEvent");
  }
  const idEvent = row.insertId;
  await eventModel.addEventToGroup(data.group_id, idEvent);
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
  await eventModel.deleteEventFromGroup(data.idevent);
  if (!data.group_id) {
    return res.redirect("/viewAllEvent");
  }
  await eventModel.addEventToGroup(data.idevent, data.group_id);
  return res.redirect("/viewAllEvent");
};
export default {
  getAddEventPage,
  addEvent,
  getViewAllEventPage,
  deleteEvent,
  getEditEventPage,
  editEvent,
};
