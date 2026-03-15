import api from "./api";

export const createPurchase = (data) => {
  return api.post("/purchases", data);
};
