import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product, Order } from '../Interfaces/product';
import { of } from 'rxjs';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const mockProducts: Product[] = [
    {
      id: 1, image: 'image-url-1', price: 100, description: 'Product 1',
      title: '',
      category: '',
      quantity: 0
    },
    {
      id: 2, image: 'image-url-2', price: 200, description: 'Product 2',
      title: '',
      category: '',
      quantity: 0
    },
  ];

  const mockOrder: Order = {
    id: 1, productId: 1, quantity: 2,
    products: [],
    name: '',
    address: '',
    phone: '',
    paymentMethod: ''
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products', () => {
    service.getProducts().subscribe((products) => {
      expect(products.length).toBe(2);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('http://localhost:3000/product');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should fetch product by ID', () => {
    const productId = 1;
    service.getProductById(productId).subscribe((product) => {
      expect(product).toEqual(mockProducts[0]);
    });

    const req = httpMock.expectOne('http://localhost:3000/product');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);

    service.getProductById(3).subscribe((product) => {
      expect(product).toBeUndefined();
    });
  });

  it('should save an order', () => {
    const order: Order = mockOrder;
    service.saveOrder(order).subscribe((savedOrder) => {
      expect(savedOrder).toEqual(order);
    });

    const req = httpMock.expectOne('http://localhost:3000/orders');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(order);
    req.flush(order);
  });

  it('should search products by query', () => {
    const query = 'Product 1';
    service.searchProducts(query).subscribe((products) => {
      expect(products.length).toBe(1);
      expect(products[0].description).toBe('Product 1');
    });

    const req = httpMock.expectOne('http://localhost:3000/product?q=Product 1');
    expect(req.request.method).toBe('GET');
    req.flush([mockProducts[0]]);
  });
});
