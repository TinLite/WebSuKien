import userModel from "../models/UserModel";
import bcrypt from "bcrypt";
const login = async (req, res) => {
  if (req.method === "GET") {
    return res.render("login");
  } else if (req.method === "POST") {
    const { email, password } = req.body;
    const [user] = await userModel.findOneByEmail(email);
    if (!user || !user.length) {
      return res.status(404).send("User not found");
    }
    // console.log(password, user[0]);
    const isPasswordMatch = await bcrypt.compare(password, user[0].password);
    if (!isPasswordMatch) {
      return res.status(401).send("Username or Password not match");
    } else {
      req.session.user = {
        username: user[0].username,
        role: user[0].role,
      };
      res.redirect("/");
    }
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Logout failed");
    }
    res.redirect("/login");
  });
};
export default {
  login,
  logout,
};
