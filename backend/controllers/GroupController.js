import GroupModel from "../models/GroupModel";
function getAllGroups(req, res) {
  res.render("home", { body: "group/listGroup" });
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
export default { getAllGroups, addGroup };
