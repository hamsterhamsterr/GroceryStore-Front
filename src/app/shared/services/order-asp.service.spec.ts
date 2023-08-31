import { TestBed } from '@angular/core/testing';

import { OrderAspService } from './order-asp.service';

describe('OrderAspService', () => {
  let service: OrderAspService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderAspService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
