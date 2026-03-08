// src/services/unit.service.js
import httpUnit from '../http-common';

const getAll = () => {
    return httpUnit.get('/units/');
}

const get = id => {
    return httpUnit.get(`/units/${id}`);
}

const create = data => {
    return httpUnit.post('/units/', data);
}

const update = data => {
    return httpUnit.put('/units/', data);
}

const remove = id => {
    return httpUnit.delete(`/units/${id}`);
}

const createQuantity = (toolId, quantity, state) => {
    return httpUnit.post(`/units/${toolId}/${quantity}/${state}`);
}

export default { 
    getAll, 
    get, 
    create, 
    update, 
    remove,
    createQuantity 
}