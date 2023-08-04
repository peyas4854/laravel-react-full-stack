import axios from 'axios';
const ApiService = {
    init() {
        const token  = localStorage.getItem('ACCESS_TOKEN');
        axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },

    get(resource, params) {
        this.init();
        return axios.get(`${resource}`, params);
    },

    post(resource, params, config = null) {
        this.init();
        return axios.post(`${resource}`, params, config);
    },

    update(resource, params) {
        this.init();
        return axios.put(`${resource}`, params);
    },

    delete(resource, params) {
        this.init();
        return axios.delete(resource);
    },

}

export default ApiService;
