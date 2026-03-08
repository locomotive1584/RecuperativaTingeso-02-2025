import httpKardex from '../http-common';

export const getAll = () => {
    return httpKardex.get('/kardex/');
}

export const get = id => {
    return httpKardex.get(`/kardex/${id}`);
}

export const getByToolId = toolId => {
    return httpKardex.get(`/kardex/toolId/${toolId}`);
}

export const getByDate = date => {
    return httpKardex.get(`/kardex/byDate/${date}`);
}

export const getByDatesBetween = (date1, date2) => {
    return httpKardex.get(`/kardex/byDatesBetween/${date1}/${date2}`);
}

export const getByDatesBefore = date => {
    return httpKardex.get(`/kardex/byDatesBefore/${date}`);
}

export const getByDatesAfter = date => {
    return httpKardex.get(`/kardex/byDatesAfter/${date}`);
}

export const getByToolIdAndDate = (toolId, date) => {
    return httpKardex.get(`/kardex/toolId/${toolId}/byDate/${date}`);
}

export const getByToolIdAndDatesBetween = (toolId, date1, date2) => {
    return httpKardex.get(`/kardex/toolId/${toolId}/byDatesBetween/${date1}/${date2}`);
}

export const getByToolIdAndDatesBefore = (toolId, date) => {
    return httpKardex.get(`/kardex/toolId/${toolId}/byDatesBefore/${date}`);
}

export const getByToolIdAndDatesAfter = (toolId, date) => {
    return httpKardex.get(`/kardex/toolId/${toolId}/byDatesAfter/${date}`);
}

export const create = data => {
    return httpKardex.post('/kardex/', data);
}

export const update = data => {
    return httpKardex.put('/kardex/', data);
}

export const remove = id => {
    return httpKardex.delete(`/kardex/${id}`);
}

export default { getAll, get, getByToolId, getByDate, getByDatesBetween, getByDatesBefore, getByDatesAfter, getByToolIdAndDate, getByToolIdAndDatesBetween, getByToolIdAndDatesBefore, getByToolIdAndDatesAfter, create, update, remove }