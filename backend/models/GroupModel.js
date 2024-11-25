import connection from "../services/SqlConnection";

const addGroup = async (data) => {
  const { id_owner, group_name } = data;
  const [group] = await connection.query(
    "INSERT INTO groups (id_owner, group_name,status) VALUES (?,?,?)",
    [id_owner, group_name, 1]
  );
  const group_id = group.insertId;
  await connection.query(
    "INSERT INTO group_member (group_id, user_id) VALUES (?,?)",
    [group_id, id_owner]
  );
  const role = "manager";
  await connection.query("UPDATE user SET role = ?  WHERE ID = ?", [
    role,
    id_owner,
  ]);
  return { group_id, id_owner, group_name, status: 1 };
};

const getAllGroups = async () => {
  const [data] = await connection.query(
    `SELECT gp.*,u.username FROM groups gp, user u WHERE u.ID = gp.id_owner `
  );
  return data;
};

const activeGroup = async (group_id) => {
  const [result] = await connection.query(
    "UPDATE groups SET status = 1 WHERE group_id = ?",
    [group_id]
  );
  return result;
};
const unActiveGroup = async (group_id) => {
  const [result] = await connection.query(
    "UPDATE groups SET status = 0 WHERE group_id = ?",
    [group_id]
  );
  return result;
};

const searchGroup = async (query) => {
  query = `%${query}%`;
  const [groups] = await connection.query(
    "SELECT gp.*, u.username FROM groups gp, user u WHERE gp.id_owner = u.ID AND (group_name LIKE ? or group_id LIKE ? or u.username LIKE ? or u.ID LIKE ?) ",
    [query, query, query, query]
  );
  return groups;
};
const updateGroup = async (group) => {
  const { group_id, group_name } = group;
  const [result] = await connection.query(
    "UPDATE groups SET group_name = ? WHERE group_id = ?",
    [group_name, group_id]
  );
  return result;
};
const getGroupById = async (group_id) => {
  const [group] = await connection.query(
    "SELECT * FROM groups WHERE group_id = ?",
    [group_id]
  );
  return group;
};
const getGroupByIdManager = async (id_owner) => {
  const [groups] = await connection.query(
    "SELECT * FROM groups WHERE id_owner = ?",
    [id_owner]
  );
  return groups;
};
export default {
  addGroup,
  getAllGroups,
  activeGroup,
  unActiveGroup,
  searchGroup,
  updateGroup,
  getGroupById,
  getGroupByIdManager,
};
