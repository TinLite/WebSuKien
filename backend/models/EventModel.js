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

const getEventById = (id) => {
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
const markAttendance = (id_event, id_user) => {
  return connection.query(
    "INSERT INTO attendance (id_user, id_event, status) VALUES (?,?,1)",
    [id_user, id_event]
  );
};
const searchParticipants = (id_event, query) => {
  query = `%${query}%`;
  return connection.query(
    "SELECT u.username FROM attendance a JOIN user u ON a.id_user = u.ID WHERE a.id_event = ? AND (u.username LIKE ? OR u.phone LIKE ?)",
    [id_event, query, query]
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
const lockEvent = (id) => {
  return connection.query("UPDATE `event` SET is_locked = 1 WHERE event.ID = ?", [id]);
};
const unlockEvent = (id) => {
  return connection.query("UPDATE `event` SET is_locked = 0 WHERE event.ID = ?", [id]);
};
const joinEvent = async (id_user, id_event) => {
  return connection.execute(
    "INSERT INTO `attendance` (id_user, id_event) VALUES (?, ?)",
    [id_user, id_event]
  )
}

const leaveEvent = async (id_user, id_event) => {
  return connection.execute(
    "DELETE FROM `attendance` WHERE id_user = ? AND id_event = ?",
    [id_user, id_event]
  )
}
export default {
  unlockEvent,
  lockEvent,
  getEventById,
  searchParticipants,
  markAttendance,
  addEvent,
  getAllEvent, 
  deleteEvent,
  editEvent, 
  getEventByName,
  getEventByIdCreater,
  addEventToGroup,
  deleteEventFromGroup,
  joinEvent,
  leaveEvent,
};
