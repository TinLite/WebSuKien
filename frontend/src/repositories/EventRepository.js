import axios from "axios";
import { API_URL } from "../configs/Constants";

export function getEventCanJoin() {
  return axios.get(`${API_URL}/event`, {
    withCredentials: true,
  });
}

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
  return axios.post(
    `${API_URL}/event/${eventId}/leave`,
    undefined,
    { withCredentials: true }
  );
}