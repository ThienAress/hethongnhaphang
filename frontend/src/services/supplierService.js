import api from "./api";

export const getSuppliers = () => {
  return api.get("/suppliers");
};

export const createSupplier = (data) => {
  return api.post("/suppliers", data);
};

export const deleteSupplier = (id) => {
  return api.delete(`/suppliers/${id}`);
};
