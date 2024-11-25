import eventModel from "../../models/EventModel.js";

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

const getEventDetails = async (req, res) => {
    try {
        const { id }  = req.params;
        const event = await eventModel.getEventById(id);

        if (!event) {
            return res.status(404).json({ message: "Sự kiện không tồn tại." });
        }

        res.status(200).json(event[0]);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy thông tin sự kiện.", error: error.message });
    }
};

const lockEvent = async (req, res) => {
    try {
        const { id } = req.params;
        await eventModel.lockEvent(id);
        res.status(200).json({ message: "Sự kiện đã được khóa thành công." });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi khóa sự kiện.", error: error.message });
    }
const editEvent = async (req, res) => {
  const data = req.body;
  await eventModel.editEvent(data);
  return res.json({ message: "Sửa sự kiện thành công" });
};

const joinEvent = async (req, res) => {
  eventModel.joinEvent(req.apiUser.ID, req.params.eventId).then(() => {
    res.json({ message: "Tham gia sự kiện thành công" });
  }).catch((err) => {
    // Bảng này set khoá chính để kiểm tra trùng, mục tiêu nhằm tránh một người dùng tham gia một event hai lần.
    switch (err.code) {
      case "ER_DUP_ENTRY":
        return res.json({ message: "Bạn đã tham gia sự kiện này" });
      case "ER_NO_REFERENCED_ROW_2":
        return res.json({ message: "Sự kiện không tồn tại" });
      default:
        console.error(err);
        return res.json({ message: "Tham gia sự kiện thất bại" });
    }
  });
}

const leaveEvent = async (req, res) => {
  eventModel.leaveEvent(req.apiUser.ID, req.params.eventId).then(() => {
    res.json({ message: "Rút khỏi sự kiện thành công" });
  }).catch((err) => {
    console.error(err);
    return res.json({ message: "Rút khỏi sự kiện thất bại" });
  });
}

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

const unlockEvent = async (req, res) => {
    try {
        const { id } = req.params;
        await eventModel.unlockEvent(id);
        res.status(200).json({ message: "Sự kiện đã mở khóa thành công." });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi mở khóa sự kiện.", error: error.message });
    }   
};

const getAllEvent = async (req, res) => {
    try {
        const event = await eventModel.getAllEvent();
        if (!event) {
            return res.status(404).json({ message: "Sự kiện không tồn tại." });
        }

        res.status(200).json(event[0]);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy thông tin sự kiện.", error: error.message });
    }
};

export default {
  addEvent,
  deleteEvent,
  editEvent,
  getAllEvents,
  getEventById,
  getEventByIdCreater,
  joinEvent,
  leaveEvent,
  unlockEvent,
  getAllEvent,
  getEventDetails,
  lockEvent,
};