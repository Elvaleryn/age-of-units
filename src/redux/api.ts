import axios from 'axios';

export default axios.create({
    baseURL: 'https://age-of-empires-api.herokuapp.com',//YOUR_API_URL HERE
    headers: {
        'Content-Type': 'application/json',
    }
});