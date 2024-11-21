import bcrypt from "bcrypt";
import { Request, Response } from "express";
import UserModel from "../../models/UserModel";
import JwtService from "../../services/JwtService";
import { validationResult } from "express-validator";

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
async function postLogin(req, res) {
  const { email, password } = req.body;
  // const result = validationResult(req);
  // if (result.isEmpty)

  const [data] = await UserModel.findOneByEmailOrUsernameOrPhoneWithPassword(
    email
  );
  if (data.length === 0) {
    return res.status(401).send({
      message: "Invalid email or password 2",
      code: "LOGIN_INVALID_EMAIL_OR_PASSWORD",
    });
  }

  const user = data[0];
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).send({
      message: "Invalid email or password 3",
      code: "LOGIN_INVALID_EMAIL_OR_PASSWORD",
    });
  }

  const token = JwtService.sign({
    userId: user.ID,
  });

  res.cookie("jwt", token, {
    httpOnly: true,
  });

  return res.send({
    message: "Login successfully",
    code: "LOGIN_SUCCESS",
  });
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
async function postLogout(req, res) {
  res.clearCookie("jwt");
  res.end();
}

export default {
  postLogin,
  postLogout,
};
