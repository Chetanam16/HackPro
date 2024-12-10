import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../Interfaces/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatGridListModule, MatButtonModule],
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent {
  products: Product[] = [];
  errorMessage: string = '';

  constructor(private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    if (history.state?.products && Array.isArray(history.state.products)) {
      history.state.products.forEach((newProduct: Product) => {
        const existingProduct = this.products.find(product => product.id === newProduct.id);
        if (existingProduct) {
          existingProduct.quantity += newProduct.quantity || 1;
        } else {
          this.products.push({
            ...newProduct,
            price: this.getValidPrice(newProduct.price),
            quantity: newProduct.quantity || 1, 
          });
        }
      });
    } else {
      this.errorMessage = 'No products available for confirmation.';
    }
  }
  
  getValidPrice(price: any): number {
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      console.error(`Invalid price value: ${price}`);
      return 0;
    }
    return parsedPrice;
  }

  getTotalAmount(): number {
    return this.products.reduce((total, product) => total + product.price * product.quantity, 0);
  }

  increaseQuantity(product: Product): void {
    product.quantity++;
  }

  decreaseQuantity(product: Product): void {
    if (product.quantity > 1) {
      product.quantity--;
    } else {
      this.removeProduct(product);
    }
  }

  removeProduct(product: Product): void {
    this.products = this.products.filter(p => p.id !== product.id);
    if (this.products.length === 0) {
      this.errorMessage = 'No products available for confirmation.';
    }
  }

  onProceedPayment(): void {
    if (this.products.length > 0) {
      this.router.navigate(['/success']);
      this.toastr.success('Confirmation Succeeded');
    } else {
      console.error('Cannot proceed to payment: No products in the list.');
    }
  }
}
