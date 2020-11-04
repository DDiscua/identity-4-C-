import * as axios from 'axios';

const API_URL = "https://localhost:5001";


const client = axios.create({
    baseURL: `${API_URL}`,
    //crossDomain: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default client;