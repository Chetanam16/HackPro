import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatCardModule} from '@angular/material/card'
import { Product } from '../../Interfaces/product';
import { ProductService } from '../../Services/product.service';
import { Router } from '@angular/router';
import { CartService } from '../../Services/cart.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator'
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  imports: [CommonModule,MatCardModule,MatPaginator,MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  product = signal<Product[]>([]);
  paginatedProducts = signal<Product[]>([]); 
  pageSize = 4;
  pageIndex = 0; 
  constructor(private toastr:ToastrService,private productService: ProductService, private router: Router,private cartService:CartService) {
    if(typeof localStorage!== 'undefined'){
      localStorage.setItem("token","admin");
    }
  }
  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.product.set(data);
      this.updatePaginatedProducts();
    });
  }
  
  
  updatePaginatedProducts(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProducts.set(this.product().slice(startIndex, endIndex));
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePaginatedProducts();
  }
  onAddToCart(product: Product): void {
    this.cartService.addToCart(product); 
    this.toastr.success('Product added to cart');
    console.log('Product added to cart:', product);
  }
}
