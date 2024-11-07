import connection from "../services/SqlConnection";

const addEvent = (data) => {
  return connection.query(
    "INSERT INTO `event` (`id_creator`, `name`, `des`, `reg_deadline`, `occasion_date`) VALUES (?,?,?,?,?)",
    [data.idCreator, data.name, data.des, data.regDeadline, data.occasionDate]
  );
};

const getAllEvent = () => {
  return connection.query(
    "SELECT user.username, event.* FROM `event` JOIN `user` ON event.id_creator = user.ID"
  );
};

const deleteEvent = (data) => {
  return connection.query("DELETE FROM `event` WHERE event.ID = ?", [
    data.idevent,
  ]);
};

const getEventByID = (id) => {
  return connection.query("SELECT * FROM `event` WHERE event.ID = ?", [id]);
};
export default { addEvent, getAllEvent, deleteEvent, getEventByID };
