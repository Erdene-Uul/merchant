import request from "utils/request";


export const list = (data) => request.get("/api/v1/backoffice/service_type", data);
export const query = () => request.get("/api/v1/backoffice/service_type/query", {});

