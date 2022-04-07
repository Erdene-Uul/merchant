import request from "utils/request";


export const list = (data) => request.get("/api/v1/merchant", data);
export const create = (data) => request.post("/api/v1/merchant", data);
export const update = (data) => request.put(`/api/v1/merchant/${data.id}`, data);
export const get = (id) => request.get(`/api/v1/merchant/${id}`,);


export const services = {
  all_services: (data) => request.get(`/api/v1/merchant/all_services/`, data),
  list: (data) => request.get(`/api/v1/merchant/services/`, data),
  create: (data) => request.post(`/api/v1/merchant/services/`, data),
  update: (data) => request.put(`/api/v1/merchant/services/${data.id}`, data),
  get: (id) => request.get(`/api/v1/merchant/services/${id}`),
}


export const transaction = {
  all_transactions: (data) => request.get(`/api/v1/merchant/all_transactions/`, data),

  list: (data) => request.get(`/api/v1/merchant/transaction/`, data),
  create: (data) => request.post(`/api/v1/merchant/transaction/`, data),
  update: (data) => request.put(`/api/v1/merchant/transaction/${data.id}`, data),
}

export const bank = {
  list: (data) => request.get(`/api/v1/merchant/bank/`, data),
  query: () => request.get(`/api/v1/merchant/bank/query`,),

  create: (data) => request.post(`/api/v1/merchant/bank/`, data),
  update: (data) => request.put(`/api/v1/merchant/bank/${data.id}`, data),
}