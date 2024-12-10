import { Component } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { Product } from '../../Interfaces/product';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-cart',
  standalone:true,
  imports:[CommonModule,MatDividerModule,MatCardModule,MatButtonModule],
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.css']
})
export class AddCartComponent {
  products: { product: Product; quantity: number }[] = [];

  constructor(
    private toastr: ToastrService,
    public cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.products = this.cartService.getCartItems();
  }

  deleteItem(product: Product): void {
    this.cartService.removeFromCart(product);
    this.products = this.cartService.getCartItems();
  }

  increaseQuantity(product: Product): void {
    const cartItem = this.products.find(item => item.product.id === product.id);
    if (cartItem) {
      this.cartService.updateQuantity(product, cartItem.quantity + 1);
      this.products = this.cartService.getCartItems();
    }
  }

  decreaseQuantity(product: Product): void {
    const cartItem = this.products.find(item => item.product.id === product.id);
    if (cartItem && cartItem.quantity > 1) {
      this.cartService.updateQuantity(product, cartItem.quantity - 1);
      this.products = this.cartService.getCartItems();
    }
  }


  goHome(): void {
    this.toastr.success('Navigated to Home Page');
    this.router.navigate(['/']);
  }

  getTotalAmount(): number {
    return this.products.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }
  
  proceedToBilling(): void {
    if (this.products.length > 0) {
      const expandedProducts = this.products.flatMap(item =>
        Array(item.quantity).fill(item.product)
      );
  
      this.router.navigate(['/details'], { state: { products: expandedProducts } });
    } else {
      this.toastr.error('No Products in Cart');
    }
  }
}
