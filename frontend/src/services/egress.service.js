import httpClient from "../http-common";

const BASE_URL = '/egress';

export const getAll = () => {
  console.log("Llamando a getAll en egress.service");
  return httpClient.get(`${BASE_URL}/all`);
};

export const getAllSorted = () => {
  console.log("Llamando a getAllSorted en egress.service");
  return httpClient.get(`${BASE_URL}/all/sorted`);
};

export const create = (data) => {
  console.log("Llamando a create con data:", data);
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