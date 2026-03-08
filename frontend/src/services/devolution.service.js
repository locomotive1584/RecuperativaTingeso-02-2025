// src/services/devolution.service.js
import httpDevolution from '../http-common';

export const getAll = () => {
    return httpDevolution.get('/devolutions/');
}

export const create = loanId => {
    return httpDevolution.post('/devolutions/', loanId);
}

export const get = id => {
    return httpDevolution.get('/devolutions/${id}');
}

export const getCost = id => {
    return httpDevolution.get('/devolutions/cost/${id}');
}

export default {getAll, create, get, getCost}