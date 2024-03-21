import axios from 'axios'
import Cookies from 'js-cookie';


let urls = {
    development: 'http://localhost:8001/api/v1/',
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

// refresh token
api.interceptors.response.use(
    response => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const token = Cookies.get('refresh_token');
                const response = await api.post('auth/refresh', { token: token });
                Cookies.set('access_token', response.data.accessToken, { expires: 1 }, { secure: true });
                originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
                return api(originalRequest);
            } catch (error) {
                console.log('Error refreshing token:', error);
                Cookies.remove('access_token');
                Cookies.remove('refresh_token');
                window.location.href = '/auth/login';
            }
        }
        return Promise.reject(error);
    }
);



export default api;