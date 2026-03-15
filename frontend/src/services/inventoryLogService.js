import api from "./api";

export const getLogs = () => api.get("/inventory/logs");
