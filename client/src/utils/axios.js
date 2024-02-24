import axios from 'axios'
import Cookies from 'js-cookie';


let urls = {
    development: 'http://localhost:8000/api/v1/',
    production: 'https://your-production-url.com/'
}
const api = axios.create({
    baseURL: urls[process.env.NODE_ENV],
    
});

// Add a request interceptor
api.interceptors.request.use(
    config => {
        const token = Cookies.get('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);



export default api;