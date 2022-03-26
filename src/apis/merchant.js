import request from "utils/request";


export const list = (data) => request.get("/api/v1/backoffice/merchant", data);
export const create = (data) => request.post("/api/v1/backoffice/merchant", data);
export const update = (data) => request.put(`/api/v1/backoffice/merchant/${data.id}`, data);
export const get = (id) => request.get(`/api/v1/backoffice/merchant/${id}`,);