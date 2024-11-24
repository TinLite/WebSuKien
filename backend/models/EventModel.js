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

const getEventById = async (id) => {
  const [rows] = await connection.query("SELECT * FROM `event` WHERE event.ID = ?", [id]);
  return rows[0];
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
const markAttendance = async (id_event, id_user) => {
  const checkAttendance = await connection.query(
    "SELECT * FROM attendance WHERE id_user = ? AND id_event = ?",
    [id_user, id_event]
  );

  if (checkAttendance.length > 0) {
    return connection.query(
      "UPDATE attendance SET status = 0 WHERE id_user = ? AND id_event = ?",
      [id_user, id_event]
    );
  } else {
    return connection.query(
      "INSERT INTO attendance (id_user, id_event, status) VALUES (?, ?, 1)",
      [id_user, id_event]
    );
  }
};
const searchParticipants = (id_event, query) => {
  return connection.query(
    "SELECT user.username FROM `attendance` JOIN `user` ON attendance.id_user = user.ID WHERE attendance.id_event = ? AND user.username like ?",
    [id_event, `%${query}%`]
  );
};
const lockEvent = (id) => {
  return connection.query("UPDATE `event` SET is_locked = 1 WHERE event.ID = ?", [id]);
};
const getParticipantsByEventId = (id_event) => {
  return connection.query(
    "SELECT user.username, attendance.status FROM attendance JOIN user ON attendance.id_user = user.ID WHERE attendance.id_event = ?",
    [id_event]
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
  markAttendance,    
  searchParticipants 
}; 
