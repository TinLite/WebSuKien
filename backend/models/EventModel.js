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
const editEvent = (data) => {
  return connection.query(
    "UPDATE `event` SET name=?, des=?, reg_deadline=?, occasion_date=? WHERE event.ID=?",
    [data.name, data.des, data.regDeadline, data.occasionDate, data.idevent]
  );
};

const getEventByName = (name) => {
  name = `%${name}%`;
  console.log(name);
  return connection.query(
    "SELECT user.username, event.* FROM `event` JOIN `user` ON event.id_creator = user.ID WHERE name like ?",
    [name]
  );
};
export default {
  getParticipantsByEventId, 
  lockEvent,
  addEvent,
  getAllEvent, 
  deleteEvent,
  getEventById,
  editEvent, 
  getEventByName,
};
