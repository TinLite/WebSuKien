import connection from "../services/SqlConnection";

const findAllUser = async (limit, offset) => {
  const [users] = await connection.query(
    "SELECT * FROM user WHERE role = 'user' LIMIT ? OFFSET ?",
    [parseInt(limit), parseInt(offset)]
  );
  const [[{ total }]] = await connection.query(
    "SELECT COUNT(*) as total FROM user WHERE role = 'user'"
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
const searchUser = async (query,limit,offset) => {
  query = `%${query}%`;
  const [users] = await connection.query(
    "SELECT * FROM user WHERE (username LIKE ? or ID LIKE ?  or phone LIKE ?) AND role = 'user' LIMIT ? OFFSET ?",
    [query, query, query,parseInt(limit), parseInt(offset)]
  );
  const [[{ total }]] = await connection.query(
    "SELECT COUNT(*) as total FROM user WHERE (username LIKE ? or ID LIKE ?  or phone LIKE ?) AND role = 'user'",
    [query, query, query]
  );
  return { total, users };
};
// const countUsers = async () => {
//   const [users] = await connection.query("SELECT COUNT(*) as total FROM user");
//   return users[0].total;
// };
function findById(id) {
  return connection.query("SELECT ID, username, phone, email, role, status FROM user WHERE id = ?", [id]);
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
};
