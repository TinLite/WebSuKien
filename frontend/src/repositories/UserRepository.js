import axios from "axios";
import { API_URL } from "../configs/Constants";


export function getProfile(id = "") {
    return axios.get(`${API_URL}/users/profile/${id}`, {
        withCredentials: true,
    });
}