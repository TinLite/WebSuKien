import UserModel from "../../models/UserModel";

function getProfile(req, res) {
  // Mặc định sẽ là user đã đăng nhập (admin)
  let user = req. apiUser;

  // Nếu có truyền ID thì lấy thông tin user theo ID
  if (req.params.id) {
    user = UserModel.findById(req.params.id);
  }
  return res.json(req.apiUser);
}

export default {
  getProfile,
}