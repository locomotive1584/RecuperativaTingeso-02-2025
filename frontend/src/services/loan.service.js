// src/services/loan.service.js
import httpLoan from '../http-common';

export const getAll = () => {
    return httpLoan.get('/loans/');
}

export const create = data => {
    return httpLoan.post("/loans/", data);
}

export const get = id => {
    return httpLoan.get('/loans/${id}');
}

export const getByClientId = clientId => {
    return httpLoan.get('/loans/getByClientId/${clientId}');
}

export const getByUnitId = unitId => {
    return httpLoan.get('/loans/getByUnitId/${unitId}');
}

export const getByToolId = toolId => {
    return httpLoan.get('/loans/tool/${toolId}');
}

export const getByDateBetween = (date1, date2) => {
    return httpLoan.get('/loans/Between/${date1}/${date2}');
}

export const getBeforeDate = date => {
    return httpLoan.get('/loans/Before/${date}');
}

export const getAfterDate = date => {
    return httpLoan.get('/loans/After/${date}');
}

export default {getAll, create, get, getByClientId, getByUnitId, getByToolId, getByDateBetween, getBeforeDate, getAfterDate}
