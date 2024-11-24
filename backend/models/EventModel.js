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
  return connection.query(
    "SELECT * FROM `event` JOIN `event_group_register` ON event_group_register.event_id = event.ID  WHERE event.ID = ?",
    [id]
  );
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

const getEventByIdCreater = (id_creator) => {
  return connection.query(
    "SELECT user.username, event.* FROM `event` JOIN `user` ON event.id_creator = user.ID WHERE event.id_creator = ?",
    [id_creator]
  );
};

const addEventToGroup = (id_group, id_event) => {
  return connection.query("INSERT INTO `event_group_register` VALUES (?, ?)", [
    id_group,
    id_event,
  ]);
};
const deleteEventFromGroup = (id_event) => {
  return connection.query(
    "DELETE FROM `event_group_register` WHERE event_id = ?",
    [id_event]
  );
};
export default {
  addEvent,
  getAllEvent,
  deleteEvent,
  getEventByID,
  editEvent,
  getEventByName,
  getEventByIdCreater,
  addEventToGroup,
  deleteEventFromGroup,
};
