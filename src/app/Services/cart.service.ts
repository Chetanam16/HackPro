import { Injectable, signal } from '@angular/core';
import { Product } from '../Interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = signal<{ product: Product; quantity: number }[]>([]);
  cartCount = signal(0);

  addToCart(product: Product): void {
    const existingItem = this.cartItems().find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.set([...this.cartItems(), { product, quantity: 1 }]);
    }
    this.cartCount.set(this.getTotalQuantity());
  }

  getCartItems(): { product: Product; quantity: number }[] {
    return this.cartItems();
  }

  removeFromCart(product: Product): void {
    const updatedCart = this.cartItems().filter(item => item.product.id !== product.id);
    this.cartItems.set(updatedCart);
    this.cartCount.set(this.getTotalQuantity());
  }

  updateQuantity(product: Product, quantity: number): void {
    const cartItem = this.cartItems().find(item => item.product.id === product.id);
    if (cartItem && quantity > 0) {
      cartItem.quantity = quantity;
      this.cartItems.set([...this.cartItems()]);
    }
  }

  getTotalQuantity(): number {
    return this.cartItems().reduce((total, item) => total + item.quantity, 0);
  }

  clearCart(): void {
    this.cartItems.set([]);
    this.cartCount.set(0);
  }

  constructor() {}
}
