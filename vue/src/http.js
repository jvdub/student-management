import axios from 'axios';
import Vue from 'vue';

const client = axios.create({
    baseURL: 'https://apa-docket.herokuapp.com/', // Dev URL: 'http://localhost:3000/',
    json: true
});

export async function execute(method, resource, data) {
    // inject the accessToken for each request
    let accessToken = await Vue.prototype.$auth.getAccessToken();

    return client({
        method,
        url: resource,
        data,
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }).then(req => {
        return req.data;
    });
}
