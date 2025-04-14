export type Product = {
  id: number;
  path: string;
  name: string;
  storeKey: string;
  inStock: boolean;
  category: string;
  createdAt: string;
};

export type ProductQuery = {
  storeKey: string | null;
  page: number | null;
  pageSize: number | null;
};

export type TodoQuery = {
  page: number | null;
  pageSize: number | null;
  completed: string | null;
  userId: string | null;
};

export type Todo = {
  userId: number | null;
  id: number | null;
  title: string | null;
  completed: boolean | null;
};
