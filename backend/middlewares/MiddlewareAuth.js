import { Request, Response } from "express";
import JwtService from "../services/JwtService";
import UserModel from "../models/UserModel";

/**
 * Lấy thông tin xác thực từ jwt
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @returns
 */
export async function middlewareJwtFetchUser(req, res, next) {
  try {
    const token = req.cookies.jwt;
    if (token) {
      const payload = JwtService.decode(token);
      const [[user]] = await UserModel.findById(payload.userId);
      req.apiUser = user;
    }
  } catch (err) {
    console.error(err);
  }
  next();
}

/**
 * Middleware kiểm tra người dùng đã đăng nhập hay chưa, từ chối nếu chưa đăng nhập
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @returns
 */
export function middlewareJwtAuth(req, res, next) {
  if (!req.apiUser) {
    return res.status(401).send({
      message: "Unauthorized",
      code: "UNAUTHORIZED",
    });
  }
  next();
}
export function middlewareJwtAdmin(req, res, next) {
  if (req.apiUser.role !== "admin") {
    return res.status(403).send({
      message: "Forbidden",
      code: "FORBIDDEN",
    });
  }
  next();
}
export function middlewareSessionAdmin(req, res, next) {
  // console.log(req.session);
  if (!req.session.user || req.session.user.role !== "admin") {
    return res.redirect("/login");
  }
  next();
}
