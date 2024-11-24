import e from "express";
import userModel from "../models/UserModel";
import bcrypt from "bcrypt";
import {body, validationResult} from "express-validator";
const getHomePage = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const offset = (page - 1) * limit;
  const { total, users } = await userModel.findAllUser(limit, offset);
  // console.log(total);
  // console.log(users);
  const totalPages = Math.ceil(total / limit);
  // console.log(users);
  res.render("home", {
    body: "user/list",
    row: users,
    currentPage: page,
    totalPages: totalPages,
  });
};
const addUser = async (req, res) => {
  if (req.method === "GET") {
    return res.render("home", { body: "user/add" });
  } else {
    const data = req.body;
    data.password = await bcrypt.hash(data.password, 10);
    const result = await userModel.addUser(data);
    // console.log(result);
    return res.redirect("/");
  }
};
const unActiveUser = async (req, res) => {
  const ID = req.params.ID;
  await userModel.unActiveUser(ID);
  return res.redirect("/");
};
const activeUser = async (req, res) => {
  const ID = req.params.ID;
  await userModel.activeUser(ID);
  return res.redirect("/");
};
const updateUser = async (req, res) => {
  const id = req.params.ID;
  if (req.method === "GET") {
    const [user] = await userModel.getOneUser(id);
    // console.log(user);
    return res.render("home", { body: "user/update", row: user });
  } else {
    const data = req.body;
    data.id = id;
    if (!data.password || data.password === "") {
      const [user] = await userModel.getOneUser(id);
      data.password = user.password;
      // console.log(data.password);
    } else {
      data.password = await bcrypt.hash(data.password, 10);
      // console.log(data.password);
    }
    const result = await userModel.updateUser(data);
    // console.log(result);
    return res.redirect("/");
  }
};

const searchUser = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const offset = (page - 1) * limit;
  const query = req.query.query ? req.query.query.trim().toLowerCase() : "";
  if (!query && !page) {
    return res.redirect("/");
  }
  let data;
  if (query) {
    data = await userModel.searchUser(query, limit, offset);
  } else {
    data = await userModel.findAllUser(limit, offset);
  }
  const { total, users } = data;
  const totalPages = Math.ceil(total / limit);

  res.render("home", {
    body: "user/list",
    row: users,
    currentPage: page,
    totalPages: totalPages,
    query: query,
  });
};
export default {
  getHomePage,
  addUser,
  unActiveUser,
  activeUser,
  updateUser,
  searchUser,
};
