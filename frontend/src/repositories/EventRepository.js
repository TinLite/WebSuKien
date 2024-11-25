import axios from "axios";
import { API_URL } from "../configs/Constants";
export function getListEventByIdCreater() {
  return axios.get(`${API_URL}/geteventbyidcreater`, {
    withCredentials: true,
  });
}
export function addEvent(formData) {
  return axios.post(`${API_URL}/addevent`, formData, {
    withCredentials: true,
  });
}
export function editEvent(formData) {
  return axios.post(`${API_URL}/editevent`, formData, {
    withCredentials: true,
  });
}
export function getEventById(id) {
  return axios.get(`${API_URL}/geteventbyid/${id}`, { withCredentials: true });
}
export function getGroupByIdManager() {
  return axios.get(`${API_URL}/getgroupbyidmanager`, { withCredentials: true });
}

export function deleteEvent(id_event) {
  return axios.post(
    `${API_URL}/deleteevent`,
    { idevent: id_event },
    { withCredentials: true }
  );
}
