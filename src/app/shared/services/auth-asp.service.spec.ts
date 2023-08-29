import { TestBed } from '@angular/core/testing';

import { AuthAspService } from './auth-asp.service';

describe('AuthAspService', () => {
  let service: AuthAspService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthAspService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
