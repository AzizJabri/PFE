import axios from 'axios'


let urls = {
    development: 'http://localhost:8000/api/v1/',
    production: 'https://your-production-url.com/'
}
const api = axios.create({
    baseURL: urls[process.env.NODE_ENV],
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});
api.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';

export default api;