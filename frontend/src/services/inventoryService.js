import api from "./api";

export const stockIn = (data) => {
  return api.post("/inventory/stock-in", data);
};
