import { Category } from "./Category";

export interface Product {
  id: string;
  category_id: string;
  name: string;
  description: string;
  category: Category;
}