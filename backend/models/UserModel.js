import connection from "../services/SqlConnection";

const findAllUser = async (limit, offset) => {
  const [users] = await connection.query(
    "SELECT * FROM user WHERE ( role = 'user' OR role = 'manager' )LIMIT ? OFFSET ?",
    [parseInt(limit), parseInt(offset)]
  );
  const [[{ total }]] = await connection.query(
    "SELECT COUNT(*) as total FROM user WHERE (role = 'user' OR role = 'manager')"
  );
  return { total, users };
};

const addUser = async (data) => {
  const { id, username, password, phone, email } = data;
  const [result] = await connection.query(
    "INSERT INTO user (ID,username,password,phone,email,role,status) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [id, username, password, phone, email, "user", "1"]
  );
  return result;
};

const unActiveUser = async (ID) => {
  const [result] = await connection.query(
    "UPDATE user SET status = 0 WHERE ID = ?",
    [ID]
  );
  return result;
};
const activeUser = async (ID) => {
  const [result] = await connection.query(
    "UPDATE user SET status = 1 WHERE ID = ?",
    [ID]
  );
  return result;
};
const getOneUser = async (ID) => {
  const [user] = await connection.query("SELECT * FROM user WHERE ID = ?", [
    ID,
  ]);
  return user;
};
const updateUser = async (data) => {
  const { username, password, phone, email, id } = data;
  const [result] = await connection.query(
    "UPDATE user SET username = ?, password = ?, phone = ?, email = ? WHERE ID = ?",
    [username, password, phone, email, id]
  );
  return result;
};
const searchUser = async (query, limit, offset) => {
  query = `%${query}%`;
  const [users] = await connection.query(
    "SELECT * FROM user WHERE (username LIKE ? or ID LIKE ?  or phone LIKE ?) AND role = 'user' LIMIT ? OFFSET ?",
    [query, query, query, parseInt(limit), parseInt(offset)]
  );
  const [[{ total }]] = await connection.query(
    "SELECT COUNT(*) as total FROM user WHERE (username LIKE ? or ID LIKE ?  or phone LIKE ?) AND role = 'user'",
    [query, query, query]
  );
  return { total, users };
};

function findById(id) {
  return connection.query(
    "SELECT ID, username, phone, email, role, status FROM user WHERE id = ?",
    [id]
  );
}

function findOneByEmail(email) {
  return connection.query("SELECT * FROM user WHERE email = ?", [email]);
}

function findOneByEmailOrUsernameOrPhoneWithPassword(entry) {
  return connection.query(
    "SELECT * FROM user WHERE email = ? OR username = ? OR phone = ?",
    [entry, entry, entry]
  );
}

async function getAllHistory(id) {
  const [history] = await connection.query(
    "SELECT * FROM history WHERE id_user = ?",
    [id]
  );
  return history;
}
async function getAllHistoryComingSoon(id) {
  const [history] = await connection.query(
    "SELECT e.*, a.*  FROM event e, attendance a WHERE id_user = ? AND e.ID = a.id_event AND e.occasion_date > CURRENT_DATE()",
    [id]
  );
  return history;
}
async function deleteAttendanceEvent(userId, eventId) {
  const [del] = await connection.query(
    "DELETE FROM attendance WHERE id_user = ? AND id_event = ?",
    [userId, eventId]
  );
  return del;
}
function getattendanceEvent(userId, eventId) {
  return connection.query(
    "SELECT * FROM attendance WHERE id_user = ? AND id_event = ?",
    [userId, eventId]
  );
}
async function addAttendanceEvent(userId, eventId) {
  const [add] = await connection.query(
    "INSERT INTO attendance (id_user, id_event, status) VALUES (?, ?, ?)",
    [userId, eventId, 1]
  );
  return add;
}
async function getAllEventMaybeJoin(userId) {
  const [events] = await connection.query(
    "SELECT e.* FROM event e, event_group_register egr, groups g, group_member gm WHERE gm.user_id = ? AND gm.group_id = g.group_id AND g.group_id = egr.group_id AND egr.event_id = e.ID  AND e.id_creator = g.id_owner;",
    [userId]
  );
  console.log(events);
  return events;
}

export default {
  findById,
  findOneByEmail,
  findAllUser,
  addUser,
  unActiveUser,
  activeUser,
  getOneUser,
  updateUser,
  findOneByEmailOrUsernameOrPhoneWithPassword,
  searchUser,
  getAllHistory,
  getAllHistoryComingSoon,
  deleteAttendanceEvent,
  addAttendanceEvent,
  getattendanceEvent,
  getAllEventMaybeJoin,
};
