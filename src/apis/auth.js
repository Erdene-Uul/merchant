import request from "utils/request";

export const login = (data) => request.post("/api/login", data);
export const me = (data) => request.post("/api/me", data);
export const logout = (data) => request.post("/api/logout", data);