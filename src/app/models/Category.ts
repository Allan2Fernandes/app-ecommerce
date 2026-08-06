export interface Category {
  id: string;
  parent_id: string;
  name: string;
  parent_nested: Category | null;
}