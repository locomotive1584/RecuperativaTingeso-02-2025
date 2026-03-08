// src/services/report.service.js
import httpReport from '../http-common';

export const getValidity = () => {
    return httpReport.get('/reports/getValidity');
}

export const getValidityBetween = (date1, date2) => {
    return httpReport.get(`/reports/getValidity/Between/${date1}/${date2}`);
}

export const getValidityBefore = (date) => {
    return httpReport.get(`/reports/getValidity/Before/${date}`);
}

export const getValidityAfter = (date) => {
    return httpReport.get(`/reports/getValidity/After/${date}`);
}

export const getClientsWithDelays = () => {
    return httpReport.get('/reports/getClientsWithDelays');
}

export const getPopularTools = () => {
    return httpReport.get('/reports/getPopularTools');
}

export const getPopularToolsBetween = (date1, date2) => {
    return httpReport.get(`/reports/getPopularTools/Between/${date1}/${date2}`);
}

export const getPopularToolsBefore = (date) => {
    return httpReport.get(`/reports/getPopularTools/Before/${date}`);
}

export const getPopularToolsAfter = (date) => {
    return httpReport.get(`/reports/getPopularTools/After/${date}`);
}

export default { 
    getValidity, 
    getValidityBetween, 
    getValidityBefore, 
    getValidityAfter,
    getClientsWithDelays,
    getPopularTools,
    getPopularToolsBetween,
    getPopularToolsBefore,
    getPopularToolsAfter
}