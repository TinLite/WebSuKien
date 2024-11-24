import UserModel from "../../models/UserModel";

function getProfile(req, res) {
  let user = req.apiUser;

  // Nếu có truyền ID thì lấy thông tin user theo ID
  if (req.params.id) {
    user = UserModel.findById(req.params.id);
  }
  return res.json(req.apiUser);
}

async function getAllHistory(req, res) {
  const user = req.apiUser;
  const history = await UserModel.getAllHistory(user.ID);
  return res.json(history);
}
async function getAllHistoryComingSoon(req, res) {
  const user = req.apiUser;
  const history = await UserModel.getAllHistoryComingSoon(user.ID);
  return res.json(history);
}

async function unAttendanceEvent(req, res) {
  const user = req.apiUser;
  const { eventId } = req.params;
  const joined = await UserModel.getattendanceEvent(user.ID, eventId);
  if (joined.length === 0) {
    return res.json({ message: "User is not attendance" });
  } else {
    const result = await UserModel.deleteAttendanceEvent(user.ID, eventId);
    return res.json(result);
  }
}
async function addAttendanceEvent(req, res) {
  const user = req.apiUser;
  const { eventId } = req.params;
  const joined = await UserModel.getattendanceEvent(user.ID, eventId);
  if (joined.length > 0) {
    return res.json({ message: "User is already attendance" });
  } else {
    const result = await UserModel.addAttendanceEvent(user.ID, eventId);
    return res.json(result);
  }
}

async function getAllEvent(req, res) {
  const user = req.apiUser;
  // console.log(user);
  const history = await UserModel.getAllEventMaybeJoin(user.ID);
  return res.json(history);
}
export default {
  getProfile,
  getAllHistory,
  getAllHistoryComingSoon,
  unAttendanceEvent,
  addAttendanceEvent,
  getAllEvent,
};
