import type { Page, Product } from "./api_interfaces";
import { api } from "./axios_creation";

const getProducts = async ({ page, size }: { page: number, size: number }): Promise<Page<Product>> => {
  const response = await api
    .get("/products", {
      params: {
        page,
        size
      },
    });

  return response.data as Page<Product>;

};

export { getProducts };