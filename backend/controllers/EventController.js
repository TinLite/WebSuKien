import e from "express";
import eventModel from "../models/EventModel.js";
import groupModel from "../models/GroupModel.js";
import moment from "moment";

const getAddEventPage = async (req, res) => {
  const groups = await groupModel.getAllGroups();
  res.render("addEvent", { groups: groups });
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
  await eventModel.deleteEventFromGroup(data.idevent);
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
  event.reg_deadline = moment
    .utc(event.reg_deadline)
    .utcOffset(7)
    .format("YYYY-MM-DD");
  event.occasion_date = moment
    .utc(event.occasion_date)
    .utcOffset(7)
    .format("YYYY-MM-DD");
  const groups = await groupModel.getAllGroups();
  res.render("editEvent", { data: { event: event, groups: groups } });
};
const editEvent = async (req, res) => {
  const data = req.body;
  await eventModel.editEvent(data);
  await eventModel.deleteEventFromGroup(data.idevent);
  if (!data.group_id) {
    return res.redirect("/viewAllEvent");
  }
  await eventModel.addEventToGroup(data.group_id, data.idevent);
  return res.redirect("/viewAllEvent");
};
const markAttendance = async (req, res) => {
  const { id_event, id_user } = req.body;
  await eventModel.markAttendance(id_event, id_user);
  return res.redirect("/viewAllEvent");
};
const searchParticipants = async (req, res) => {
  const { id_event, query } = req.query;
  const participants = await eventModel.searchParticipants(id_event, query);
  res.render("eventParticipants", { participants });
};
const getEventDetails = async (req, res) => {
  const { id } = req.params;
  const event = await eventModel.getEventById(id);
  res.render("detailEvent", { event });
};
const lockEvent = async (req, res) => {
  const { idevent } = req.body;
  await eventModel.lockEvent(idevent);
  return res.redirect("/viewAllEvent");
};
const getEventParticipants = async (req, res) => {
  const { id } = req.params;
  const participants = await eventModel.getParticipantsByEventId(id);
  res.render("partEvent", { participants });
};
export default {
  getEventParticipants,
  lockEvent,
  getEventDetails,
  getAddEventPage,
  addEvent,
  getViewAllEventPage,
  deleteEvent,
  getEditEventPage,
  editEvent,
  markAttendance,
  searchParticipants,
};
