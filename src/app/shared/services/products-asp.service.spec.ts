import { TestBed } from '@angular/core/testing';

import { ProductsAspService } from './products-asp.service';

describe('ProductsAspService', () => {
  let service: ProductsAspService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsAspService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
