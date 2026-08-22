import { User } from "./User";

export interface Review {
  id: string;
  rating: number;
  product_id: string;
  title: string;
  explanation: string;
  user_id: string;
  reviewer: User;
}
