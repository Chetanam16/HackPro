export interface Product {
    id:number;
    title:string;
    description:string;
    price:number;
    category:string;
    image:string;
    quantity: number; 
}
export interface Order {
    id:number;
    productId: number;  
  quantity: number;
    products: Product[];
    name: string;
    address: string;
    phone: string;
    paymentMethod: string;
}
export interface CartItem {
    product: Product;
    quantity: number;
  }
  