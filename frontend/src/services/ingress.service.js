import httpClient from "../http-common";

const BASE_URL = '/ingress';

export const getAll = () => {
    return httpClient.get(`${BASE_URL}/all`);
};

export const getAllSorted = () => {
    return httpClient.get(`${BASE_URL}/all/sorted`);
};

export const create = (data) => {
    return httpClient.post(`${BASE_URL}/`, data);
};

export const ping = () => {
    return httpClient.get(`${BASE_URL}/ping`);
};

export default {
    getAll,
    getAllSorted,
    create,
    ping
};