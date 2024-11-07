import connection from "../services/SqlConnection";

const addEvent = (data) => {
  return connection.query(
    "INSERT INTO `event` (`id_creator`, `name`, `des`, `reg_deadline`, `occasion_date`) VALUES (?,?,?,?,?)",
    [data.idCreator, data.name, data.des, data.regDeadline, data.occasionDate]
  );
};
export default { addEvent };
