
function getAllGroups(req, res) {
 res.render("home", { body: "group/listGroup" });
}
export default { getAllGroups };