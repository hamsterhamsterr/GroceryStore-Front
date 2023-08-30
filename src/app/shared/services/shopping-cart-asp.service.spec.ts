import { TestBed } from '@angular/core/testing';

import { ShoppingCartAspService } from './shopping-cart-asp.service';

describe('ShoppingCartAspService', () => {
  let service: ShoppingCartAspService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingCartAspService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
