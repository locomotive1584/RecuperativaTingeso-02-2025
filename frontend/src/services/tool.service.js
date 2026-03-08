
import httpTool from '../http-common';

export const getAll = () => {
    return httpTool.get('/tools/');
}

export const create = data => {
    return httpTool.post("/tools/", data);
}

export const get = id => {
    return httpTool.get(`/tools/${id}`);
}

export const update = data => {
    return httpTool.put('/tools/', data);
}

export const remove = id => {
    return httpTool.delete(`/tools/${id}`);
}

export default {getAll, create, get, update, remove}