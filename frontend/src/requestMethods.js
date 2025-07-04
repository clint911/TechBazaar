import axios from 'axios';

const BASE_URL = 'https://myduka-server.onrender.com/api';
/* const BASE_URL = 'http://localhost:5050/api'; */

const currentUser = localStorage.getItem('currentUser');

export const publicRequest = axios.create({
    baseURL: `${BASE_URL}`,
});

export const userRequest = axios.create({
    baseURL: `${BASE_URL}`,
    header: {
        token: currentUser && `Bearer ${currentUser.token}`
    }
});