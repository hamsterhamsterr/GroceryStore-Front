import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginASPComponent } from './login-asp.component';

describe('LoginASPComponent', () => {
  let component: LoginASPComponent;
  let fixture: ComponentFixture<LoginASPComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginASPComponent]
    });
    fixture = TestBed.createComponent(LoginASPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
