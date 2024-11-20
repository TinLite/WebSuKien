import axios from 'axios';
import { API_URL } from '../configs/Constants';

export function login(email, password) {
    return axios.post(`${API_URL}/login`, { email, password }, {
        withCredentials: true,
    });
}

export function logout(email, password) {
    return axios.post(`${API_URL}/logout`, { email, password }, {
        withCredentials: true,
    });
}