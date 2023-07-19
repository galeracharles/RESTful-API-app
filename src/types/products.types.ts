export interface Product {
  product_id: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  status: "available" | "oos";
}
