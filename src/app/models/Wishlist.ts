import { Product } from "./Product";

export interface Wishlist {
    id: string;
    title: string
    user_id: string;
    products: Product[];
}