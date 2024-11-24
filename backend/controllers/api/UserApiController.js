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
export default {
  getProfile,
  getAllHistory,
  getAllHistoryComingSoon,
};
