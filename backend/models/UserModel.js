import connection from "../services/SqlConnection";

const findAllUser = async () => {
  const [user] = await connection.query(
    "SELECT * FROM user WHERE role = 'user'"
  );
  return user;
};

const addUser = async (data) => {
  const { id, username, password, phone, email } = data;
  const [result] = await connection.query(
    "INSERT INTO user (ID,username,password,phone,email,role,status) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [id, username, password, phone, email, "user", "1"]
  );
  return result;
};

const unActiveUser = async (id) => {
  const [result] = await connection.query(
    "UPDATE user SET status = 0 WHERE id = ?",
    [id]
  );
  return result;
};
const activeUser = async (id) => {
  const [result] = await connection.query(
    "UPDATE user SET status = 1 WHERE id = ?",
    [id]
  );
  return result;
};

function findById(id) {
  return connection.query("SELECT * FROM user WHERE id = ?", [id]);
}

function findOneByEmail(email) {
  return connection.query("SELECT * FROM user WHERE email = ?", [email]);
}

export default {
  findById,
  findOneByEmail,
  findAllUser,
  addUser,
  unActiveUser,
  activeUser,
};
