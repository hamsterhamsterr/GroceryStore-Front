import { TestBed } from '@angular/core/testing';

import { AdminAuthGuard } from 'shared/services/admin-auth-guard.service';

describe('AdminAuthGuardService', () => {
  let service: AdminAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAuthGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
