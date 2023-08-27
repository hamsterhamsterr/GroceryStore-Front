import { TestBed } from '@angular/core/testing';

import { CategoryAspService } from './category-asp.service';

describe('CategoryAspService', () => {
  let service: CategoryAspService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryAspService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
