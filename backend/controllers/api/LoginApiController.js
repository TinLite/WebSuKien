import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel from "../../models/UserModel";
import JwtService from "../../services/JwtService";

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
async function postLogin(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).send({
      message: "Missing email or password",
      code: "LOGIN_MISSING_EMAIL_OR_PASSWORD",
    });
  }

  const [data] = await UserModel.findOneByEmailOrUsernameOrPhone(email);
  if (data.length === 0) {
    return res.status(401).send({
      message: "Invalid email or password",
      code: "LOGIN_INVALID_EMAIL_OR_PASSWORD",
    });
  }

  const user = data[0];
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).send({
      message: "Invalid email or password",
      code: "LOGIN_INVALID_EMAIL_OR_PASSWORD",
    });
  }

  const token = JwtService.sign({
    userId: user.ID,
  })

  res.cookie('jwt', token, {
    httpOnly: true,
  })

  return res.send({
    message: "Login successfully",
    code: "LOGIN_SUCCESS",
  });
}

export default {
  postLogin,
};
