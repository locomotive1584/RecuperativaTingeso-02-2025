import httpClient from "../http-common"

export const getAll = () => {
    return httpClient.get('/clients/');
}

export const create = data => {
    return httpClient.post("/clients/", data);
}

export const get = id => {
    return httpClient.get(`/clients/${id}`);
}

export const update = data => {
    return httpClient.put('/clients/', data);
}

export const remove = id => {
    return httpClient.delete(`/clients/${id}`);
}

export default {getAll, create, get, update, remove}