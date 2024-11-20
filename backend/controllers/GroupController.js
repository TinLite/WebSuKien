import GroupModel from "../models/GroupModel";
async function getAllGroups(req, res) {
  const data = await GroupModel.getAllGroups();
//   console.log(data);
  res.render("home", {
    body: "group/listGroup",
    row: data,
  });
}
async function addGroup(req, res) {
  if (req.method === "GET") {
    res.render("home", { body: "group/addGroup" });
  } else if (req.method === "POST") {
    const group = req.body;
    const result = await GroupModel.addGroup(group)
      .then(() => {
        res.redirect("/group");
      })
      .catch((err) => {
        console.error(err);
        res.send({ error: "Error" });
      });
    return result;
  }
}

async function activeGroup(req, res) {
  const group_id = req.params.group_id;
  await GroupModel.activeGroup(group_id);
  return res.redirect("/group");
}

async function unActiveGroup(req, res) {
  const group_id = req.params.group_id;
  await GroupModel.unActiveGroup(group_id);
  return res.redirect("/group");
}
async function searchGroup(req, res) {
  const query = req.query.query ? req.query.query.trim().toLowerCase() : "";
  if (!query) {
    return res.redirect("/group");
  }
  let data;
  if (query) {
    data = await GroupModel.searchGroup(query);
  }
  const groups = data;
  res.render("home", {
    body: "group/listGroup",
    row: groups,
    query: query,
  });
}
async function updateGroup(req, res) {
  const group_id = req.params.group_id;
  if (req.method === "GET") {
    const [group] = await GroupModel.getGroupById(group_id);
    // console.log(group);
    res.render("home", { body: "group/updateGroup", row: group });
  } else if (req.method === "POST") {
    const group = req.body;
    group.group_id = group_id;
    await GroupModel.updateGroup(group);
    res.redirect("/group");
  }
}
export default {
  getAllGroups,
  addGroup,
  activeGroup,
  unActiveGroup,
  searchGroup,
  updateGroup,
};
