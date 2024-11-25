import eventModel from "../../models/EventModel";
import groupModel from "../../models/GroupModel";
const addEvent = async (req, res) => {
  const data = req.body;
  data.idCreator = req.apiUser.ID;
  await eventModel.addEvent(data);
  return res.json({ message: "Tạo sự kiện thành công" });
};

const deleteEvent = async (req, res) => {
  const data = req.body;
  //xóa khóa ngoại
  eventModel.deleteEventFromGroup(data.idevent);
  await eventModel.deleteEvent(data);
  return res.json({ message: "Xóa sự kiện thành công" });
};

const editEvent = async (req, res) => {
  const data = req.body;
  await eventModel.editEvent(data);
  return res.json({ message: "Sửa sự kiện thành công" });
};

const getAllEvents = async (req, res) => {
  const { find } = req.query;
  let events;
  if (find) {
    [events] = await eventModel.getEventByName(find);
  } else {
    [events] = await eventModel.getAllEvent();
  }
  res.json(events);
};
const getEventById = async (req, res) => {
  const { id } = req.params;
  let [event] = await eventModel.getEventByID(id);
  event = event[0];
  res.json(event);
};
const getEventByIdCreater = async (req, res) => {
  //   const { id_creater } = req.params;
  const id_creater = req.apiUser.ID;
  let [event] = await eventModel.getEventByIdCreater(id_creater);
  res.json(event);
};
const getGroupByIdManager = async (req, res) => {
  const id_manager = req.apiUser.ID;
  let groups = await groupModel.getGroupByIdManager(id_manager);
  res.json({ groups });
};
export default {
  addEvent,
  deleteEvent,
  editEvent,
  getAllEvents,
  getEventById,
  getEventByIdCreater,
  getGroupByIdManager,
};
