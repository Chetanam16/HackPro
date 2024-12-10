import { Component } from '@angular/core';
import { CartService } from '../../../Services/cart.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
   constructor(public cartService: CartService,private router:Router) {}
    get cartCount(): number {
      return this.cartService.cartCount();  }
  
  navigateToCart(): void {
    this.router.navigate(['/addcart']);
  }
}
