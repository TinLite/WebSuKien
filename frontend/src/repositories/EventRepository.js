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

export function unlockEvent(id) {
  return axios.post(
    `${API_URL}/unlock/${id}`,
    {},
    {
      withCredentials: true,
    }
  );
}
export function lockEvent(id) {
  return axios.post(
    `${API_URL}/lock/${id}`,
    {},
    {
      withCredentials: true,
      /*headers: {
      "Content-Type": "application/json",
    },
    data: {
      idevent: id,
      is_locked: true,
      }*/
    }
  );
}

/**
 * Tham gia sự kiện
 * @author Vinh
 * @param {String} eventId ID sự kiện muốn tham gia
 * @returns
 */
export function joinEvent(eventId) {
  return axios.post(
    `${API_URL}/event/${eventId}/join`,
    undefined, // Variable thứ hai luôn là body của post
    { withCredentials: true }
  );
}

/**
 * Hủy tham gia sự kiện
 * @param {String} eventId ID sự kiện muốn hủy tham gia
 * @returns
 */
export function leaveEvent(eventId) {
  return axios.post(`${API_URL}/event/${eventId}/leave`, undefined, {
    withCredentials: true,
  });
}
