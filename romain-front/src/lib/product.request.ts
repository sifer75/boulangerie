import { DaysState } from "./type";
import { BACKEND_HOST } from "./utils";

export const createProduct = async (data: DaysState) => {
  const response = await fetch(`http://${BACKEND_HOST}:3333/product/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la création du produit");
  }
  return response.json();
};

export const getAllProducts = async () => {
  const response = await fetch(`http://${BACKEND_HOST}:3333/product/get`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des produits");
  }
  return response.json();
};

export const updateProduct = async ({ days }: { days: DaysState }) => {
  const response = await fetch(`http://${BACKEND_HOST}:3333/product/update`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(days),
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des produits");
  }
  return response.json();
};

export const deleteProduct = async ({ id }: { id: number }) => {
  const response = await fetch(`http://${BACKEND_HOST}:3333/product/delete`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la suppression du produit");
  }
  return response.json();
};
