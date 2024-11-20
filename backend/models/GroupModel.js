import connection from "../services/SqlConnection";

const addGroup = async (data) => {
  const { id_owner, group_name } = data;
  const [group] = await connection.query(
    "INSERT INTO groups (id_owner, group_name,status) VALUES (?, ?,?)",
    [id_owner, group_name, 1]
  );
  return group;
};

const getAllGroups = async () => {
  const [listGroup] = await connection.query(
    `SELECT * FROM group WHERE status = 1`
  );
  return listGroup;
};
export default { addGroup, getAllGroups };
