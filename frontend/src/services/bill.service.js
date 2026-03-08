import httpBill from '../http-common';

export const setDailyCost = (id, cost) => {
    return httpBill.put(`/bills/DC/${id}/${cost}`);
}

export const setDailyFine = (id, cost) => {
    return httpBill.put(`/bills/DF/${id}/${cost}`);
}

export const setRepositionCost = (id, cost) => {
    return httpBill.put(`/bills/RC/${id}/${cost}`);
}

export default { setDailyCost, setDailyFine, setRepositionCost }