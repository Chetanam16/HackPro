import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Product } from '../Interfaces/product';

describe('CartService', () => {
  let service: CartService;
  const testProduct: Product = {
    id: 1, image: 'image-url', price: 100, description: 'Test Product',
    title: '',
    category: '',
    quantity: 0
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a product to the cart', () => {
    service.addToCart(testProduct);
    expect(service.getCartItems()).toEqual([{ product: testProduct, quantity: 1 }]);
    expect(service.cartCount()).toBe(1);
  });

  it('should increase the quantity of an existing product', () => {
    service.addToCart(testProduct);
    service.addToCart(testProduct);
    expect(service.getCartItems()).toEqual([{ product: testProduct, quantity: 2 }]);
    expect(service.cartCount()).toBe(2);
  });

  it('should remove a product from the cart', () => {
    service.addToCart(testProduct);
    service.removeFromCart(testProduct);
    expect(service.getCartItems()).toEqual([]);
    expect(service.cartCount()).toBe(0);
  });

  it('should update the quantity of a product', () => {
    service.addToCart(testProduct);
    service.updateQuantity(testProduct, 5);
    expect(service.getCartItems()).toEqual([{ product: testProduct, quantity: 5 }]);
  });

  it('should not update the quantity to 0 or negative', () => {
    service.addToCart(testProduct);
    service.updateQuantity(testProduct, 0);
    expect(service.getCartItems()).toEqual([{ product: testProduct, quantity: 1 }]);
  });

  it('should clear the cart', () => {
    service.addToCart(testProduct);
    service.clearCart();
    expect(service.getCartItems()).toEqual([]);
    expect(service.cartCount()).toBe(0);
  });

  it('should return the correct total quantity of products', () => {
    service.addToCart(testProduct);
    const anotherProduct: Product = {
      id: 2, image: 'image-url-2', price: 200, description: 'Another Product',
      title: '',
      category: '',
      quantity: 0
    };
    service.addToCart(anotherProduct);
    service.addToCart(anotherProduct);
    expect(service.getTotalQuantity()).toBe(3);
  });
});
