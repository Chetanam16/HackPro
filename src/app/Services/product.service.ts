import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order, Product } from '../Interfaces/product';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
products:Product[]=[];
apiUrl='http://localhost:3000/product';
  constructor(private http:HttpClient) { }
product:Product[]=[];
getProducts(): Observable<Product[]> {
  return this.http.get<Product[]>(this.apiUrl);
}
getProductById(id: number): Observable<Product | undefined> {
  const product = this.products.find((product) => product.id === id);
  return of(product); 
}
private dataUrl = 'http://localhost:3000/orders';
saveOrder(order: any): Observable<any> {
  console.log('Saving order:', order);

  return this.http.post<Order>(this.dataUrl, order);
}
searchProducts(query: string): Observable<Product[]> {
  return this.http.get<Product[]>(`${this.apiUrl}?q=${query}`);
}
}
