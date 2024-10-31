    // axiosConfig.js

    import axios from 'axios';

    const axiosInstance = axios.create({
        baseURL: '/api/',  // Imposta la baseURL delle tue API Django
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),  // Ottieni il token CSRF dai cookie
            'Content-Type': 'application/json',
        },
    });

    export default axiosInstance;

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
            }
        }
        }
        return cookieValue;
      }