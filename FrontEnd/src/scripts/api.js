const API_URL = 'http://localhost:3000'

const make_url = (api) => {
    return API_URL + (api.startsWith('/') ? api : '/' + api);
};

const request = async (end_point, options = {}) => {
    const token = localStorage.getItem('access_token');
    const headers = {
        ...(options.headers || {}),
        ...(token && {'Authorization': `Bearer ${token}`})
    };

    const fetch_url = make_url(end_point);
    
    return fetch(fetch_url, {
        ...options,
        headers,
    });
};

const get = (end_point, options = {}) => {
    return request(end_point, { ...options, method: 'GET' });
};

const post = (end_point, body = {}, options = {}) => {
    return request(end_point, { ...options, method: 'POST', body: body, });
};

export const API = {
    make_url,
    request, get, post
}