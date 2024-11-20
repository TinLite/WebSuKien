import UserModel from "../../models/UserModel";

function getProfile(req, res) {
  let user = req.apiUser;
  
  if (!user) {
    // Người dùng chưa đăng nhập 
    return res.status(401).send({
      message: "Unauthorized",
      code: "UNAUTHORIZED",
    });
  }

  // Nếu có truyền ID thì lấy thông tin user theo ID
  if (req.params.id) {
    user = UserModel.findById(req.params.id);
  }
  return res.json(req.apiUser);
}

export default {
  getProfile,
}