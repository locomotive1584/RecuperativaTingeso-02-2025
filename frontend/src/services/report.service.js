import httpClient from "../http-common"

const BASE_URL = '/reports'

export const getAllTransactions = () => {
  return httpClient.get(`${BASE_URL}/After/Before/`)
}

// Obtener transacciones filtradas por fecha (from y to pueden ser null)
export const getTransactionsFiltered = (from, to) => {
  let url = `${BASE_URL}/After`
  url += from ? `/${from}` : ''
  url += '/Before'
  url += to ? `/${to}` : ''
  url += '/'
  return httpClient.get(url)
}

export const ping = () => {
  return httpClient.get(`${BASE_URL}/ping`)
}

export default {
  getAllTransactions,
  getTransactionsFiltered,
  ping
}