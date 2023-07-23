import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (!error.response) {
            console.error('Network error. Please check your connection and try again.');
        } else if (error.response.status === 401) {
            console.error('Your session has expired. Please log in again.');
            // Redirect the user to the login page.
        } else if (error.response.status === 500) {
            console.error('There was an error on the server. Please try again later.');
        }

        return Promise.reject(error);
    }
);

export default api;
