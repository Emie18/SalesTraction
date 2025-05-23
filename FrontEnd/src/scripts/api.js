import { jwtDecode } from 'jwt-decode';
const API_URL =`http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}`

const make_url = (api) => {
    return API_URL + (api.startsWith('/') ? api : '/' + api);
};

const is_token_expired = (token) => {
    try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000; // in seconds
        return decoded.exp < now;
    } catch (err) {
        return true; // treat invalid tokens as expired
    }
};

const request = async (end_point, options = {}, require_token = true) => {
    const token = localStorage.getItem('access_token');
    const headers = {
        ...(options.headers || {}),
        ...((token && require_token) && {'Authorization': `Bearer ${token}`})
    };

    // Check token expiration
    if (require_token && (!token || is_token_expired(token))) {
        localStorage.removeItem('session');
        localStorage.removeItem('access_token');
        window.location.href = '/';
        throw new Error('Token expired');
    }

    const fetch_url = make_url(end_point);
    
    return fetch(fetch_url, {
        ...options,
        headers,
    });
};

const get = (end_point, options = {}, require_token = true) => {
    return request(end_point, { ...options, method: 'GET' }, require_token);
};

const post = (end_point, body = {}, options = {}, require_token = true) => {
    return request(end_point, { ...options, method: 'POST', body: body, }, require_token);
};

export const API = {
    make_url,
    request, get, post
}