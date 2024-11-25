import axios from "axios";
import { API_URL } from "../configs/Constants";

export function getEventCanJoin() {
  return axios.get(`${API_URL}/event`, {
    withCredentials: true,
  });
}

export function getListEventByIdCreater() {
  return axios.get(`${API_URL}/event`, {
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
export function unlockEvent(id) {
  return axios.post(`${API_URL}/unlock/${id}`, {}, {
    withCredentials: true,
  });
}
export function lockEvent(id) {
  return axios.post(`${API_URL}/lock/${id}`, {}, {
    withCredentials: true,
    /*headers: {
      "Content-Type": "application/json",
    },
    data: {
      idevent: id,
      is_locked: true,
      }*/
    }
  )
}
