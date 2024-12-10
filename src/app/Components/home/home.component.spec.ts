import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { HomeComponent } from './home.component';
import { ProductService } from '../../Services/product.service';
import { CartService } from '../../Services/cart.service';
import { Product } from '../../Interfaces/product';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let productService: ProductService;
  let cartService: CartService;
  let toastrService: ToastrService;

  const mockProducts: Product[] = [
    {
      id: 1, image: 'img1.jpg', price: 100, description: 'Product 1',
      title: '',
      category: '',
      quantity: 0
    },
    {
      id: 2, image: 'img2.jpg', price: 200, description: 'Product 2',
      title: '',
      category: '',
      quantity: 0
    },
    
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent,
        HttpClientTestingModule,
        RouterTestingModule,
        MatCardModule,
        MatButtonModule,
        MatPaginatorModule,
        ToastrModule.forRoot(),
      ],
      
      providers: [
        ProductService,
        CartService,
        ToastrService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    cartService = TestBed.inject(CartService);
    toastrService = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch products on initialization', () => {
    spyOn(productService, 'getProducts').and.returnValue(of(mockProducts));
    component.ngOnInit();
    expect(component.product()).toEqual(mockProducts);
    expect(component.paginatedProducts().length).toBeLessThanOrEqual(component.pageSize);
  });

  it('should update paginated products correctly', () => {
    component.product.set(mockProducts);
    component.pageIndex = 0;
    component.pageSize = 1;
    component.updatePaginatedProducts();
    expect(component.paginatedProducts()).toEqual([mockProducts[0]]);

    component.pageIndex = 1;
    component.updatePaginatedProducts();
    expect(component.paginatedProducts()).toEqual([mockProducts[1]]);
  });

  it('should handle page changes correctly', () => {
    const pageEvent = { pageIndex: 1, pageSize: 1, length: 2 } as PageEvent;
    component.product.set(mockProducts);
    component.onPageChange(pageEvent);
    expect(component.pageIndex).toBe(1);
    expect(component.pageSize).toBe(1);
    expect(component.paginatedProducts()).toEqual([mockProducts[1]]);
  });

  it('should add a product to the cart and show a success message', () => {
    spyOn(cartService, 'addToCart');
    spyOn(toastrService, 'success');
    const product = mockProducts[0];

    component.onAddToCart(product);

    expect(cartService.addToCart).toHaveBeenCalledWith(product);
    expect(toastrService.success).toHaveBeenCalledWith('Product added to cart');
  });
});
