import httpMovement from '../http-common';

export const getAll = () => {
    return httpMovement.get('/movements/');
}

export const get = id => {
    return httpMovement.get('/movements/${id}');
}

export const getByClientId = clientId => {
    return httpMovement.get('/movements/clientId/${clientId}');
}

export const getByDate = date => {
    return httpMovement.get('/movements/byDate/${date}');
}

export const getByDatesBetween = (date1, date2) => {
    return httpMovement.get('/movements/byDatesBetween/${date1}/${date2}');
}

export const getByDatesBefore = date => {
    return httpMovement.get('/movements/byDatesBefore/${date}');
}

export const getByDatesAfter = date => {
    return httpMovement.get('/movements/byDatesAfter/${date}');
}

export const getByUnitId = unitId => {
    return httpMovement.get('/movements/unitId/${unitId}');
}

export const create = data => {
    return httpMovement.post('/movements/', data);
}

export const remove = id => {
    return httpMovement.delete('/movements/${id}');
}

export default { getAll, get, getByClientId, getByDate, getByDatesBetween, getByDatesBefore, getByDatesAfter, getByUnitId, create, remove }