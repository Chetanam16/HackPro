import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../Services/product.service';
import { Router } from '@angular/router';
import { Order, Product } from '../../Interfaces/product';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatStep, MatStepper, MatStepperModule } from '@angular/material/stepper';@Component({
  selector: 'app-details',
  imports: [CommonModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatRadioModule,MatStepperModule,ReactiveFormsModule,FormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  errorMessage: string = '';
  constructor(
private productService:ProductService,  
  private fb: FormBuilder,
    private router: Router
  ) {
    this.products =
    this.router.getCurrentNavigation()?.extras.state?.['product'];
  console.log('Product data', this.products);
  }
  products: Product[] = [];
  addressForm!: FormGroup;
  paymentForm!: FormGroup;
  checkoutForm!: FormGroup;
  getTotalAmount(): number {
    if (Array.isArray(this.products)) {
      return this.products.reduce((total, product) => {
        if (product.price !== undefined) {
          return total + product.price;
        }
        return total;  
      }, 0);
    }
    return 0;  
  }
  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (history.state?.products && Array.isArray(history.state.products)) {
      this.products = history.state.products;
      console.log('Products received in Confirmation:', this.products);  
    } else {
      console.error('No valid products found in confirmation page');
      this.errorMessage = 'No products available for confirmation.';  
    }

    this.addressForm = this.fb.group({
      name: ['', Validators.required],
      lname: ['', Validators.required],
      email:['',[Validators.required,Validators.email]],
      address:['',Validators.required],
      state:['',Validators.required],
      city:['',Validators.required],
      postal:['',Validators.required],
      phone: ['',
    [
      Validators.required,
      Validators.pattern('^[0-9]{10}$')   
    ]],
    });

    this.paymentForm = this.fb.group({
      paymentMethod: ['', Validators.required],  
      cardName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]+')]],  
      expiryDate: ['', Validators.required],  
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],  
    });

    this.checkoutForm = this.fb.group({
      address: this.addressForm,
      payment: this.paymentForm,
    });
  }
  onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '').slice(0, 10);
  }
  
  onConfirmOrder(): void {
    console.log('Proceed button clicked');
  
    if (!this.products || this.products.length === 0) {
      this.errorMessage = 'No product selected. Please go back and select a product.';
      return; 
    }
  
    if (this.paymentForm.invalid || this.addressForm.invalid) {
      this.errorMessage = 'Please fill out all required fields.';
      return; 
    }
  
    const order: Order = {
      products: this.products,
      name: this.addressForm.value.name,
      address: this.addressForm.value.address,
      phone: this.addressForm.value.phone,
      paymentMethod: this.paymentForm.value.paymentMethod,
      id: 0,
      productId: 0,
      quantity: 0
    };
  
    console.log('Order data:', order);
  
    this.productService.saveOrder(order).subscribe(
      (response) => {
        console.log('Order saved successfully:', response);
        this.router.navigate(['/confirmation'], {
          state: { products: this.products },
        });
      },
      (error) => {
        this.errorMessage =
          'An error occurred while saving the order. Please try again.';
        console.error('Error saving order: ', error);
      }
    );
  
  }
}
