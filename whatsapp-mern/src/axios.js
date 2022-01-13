import axios from 'axios';

const insatnce = axios.create({
    baseURL: 'http://localhost:9000/'
})

export default insatnce;