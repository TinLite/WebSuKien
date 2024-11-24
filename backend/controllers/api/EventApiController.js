import eventModel from "../../models/EventModel";

const addEvent = async (req, res) => {
  const data = req.body;
  data.idCreator = req.apiUser.ID;
  await eventModel.addEvent(data);
  return res.json({ message: "Tạo sự kiện thành công" });
};

const deleteEvent = async (req, res) => {
  const data = req.body;
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
  console.log("fxdfxdfxdffxd");
  const { id } = req.params;
  let [event] = await eventModel.getEventByID(id);
  console.log(id);
  event = event[0];
  res.json(event);
};
const getEventByIdCreater = async (req, res) => {
  //   const { id_creater } = req.params;
  const id_creater = req.apiUser.ID;
  let [event] = await eventModel.getEventByIdCreater(id_creater);
  res.json(event);
};
export default {
  addEvent,
  deleteEvent,
  editEvent,
  getAllEvents,
  getEventById,
  getEventByIdCreater,
};
