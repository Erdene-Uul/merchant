import request from "utils/request";

export const _ = (data) => request.post("/api/upload", data)
export const signature = (data) => request.post("/api/upload_signature", data)