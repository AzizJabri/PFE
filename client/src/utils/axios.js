import axios from 'axios'
import Cookies from 'js-cookie';


let urls = {
    development: 'http://localhost:8001/api/v1/',
    production:  'http://20.56.230.150/api/v1/',
}
const api = axios.create({
    baseURL: urls[process.env.NODE_ENV],
});

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
                console.log('Token:', token);
                if (!token) {
                    return Promise.reject(error);
                }
                const formData = new FormData();
                formData.append('refreshToken', token);

                const refreshTokenResponse = await api.post('auth/refresh', formData, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                });
                const newAccessToken = refreshTokenResponse.data.accessToken;
                Cookies.set('access_token', newAccessToken, { expires: 1, secure: true });

                // Update the Authorization header with the new access token
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                // Retry the original request with the updated token
                return api(originalRequest);
            } catch (error) {
                console.log('Error refreshing token:', error);
                // Throw the error to maintain the error flow
                Cookies.remove('access_token');
                Cookies.remove('refresh_token');
                return Promise.reject(error);
            }
        }
        // For other errors, reject the promise
        return Promise.reject(error);
    }
);




export default api;