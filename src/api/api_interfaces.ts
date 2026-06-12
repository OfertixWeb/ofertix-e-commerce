interface Product {
  code: string;
  imgUrl: string;
  normalPrice: number;
  desc: string;
}

interface Page<T> {
  page: number;
  size: number;
  total: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  data: T[];
}

export type { Product, Page };