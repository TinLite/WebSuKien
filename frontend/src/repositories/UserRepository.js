import axios from "axios";
import { API_URL } from "../configs/Constants";


export function getProfile(id = "") {
    return axios.get(`${API_URL}/users/profile/${id}`, {
        withCredentials: true,
    });
}

export function getHistory(){
    return axios.get(`${API_URL}/user/history`, {
        withCredentials: true,
    });
}

export function getEventUpcoming(){
    return axios.get(`${API_URL}/user/eventUpcoming`, {
        withCredentials: true,
    });
}