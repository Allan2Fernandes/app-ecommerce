import { Category } from "./Category";
import { Image } from "./Image";
import { Review } from "./Review";

export interface Product {
  id: string;
  category_id: string;
  name: string;
  description: string;
  category: Category;
  images: Image[];
  reviews: Review[];
}