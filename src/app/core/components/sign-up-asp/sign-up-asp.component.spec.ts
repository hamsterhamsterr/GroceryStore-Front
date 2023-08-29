import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpAspComponent } from './sign-up-asp.component';

describe('SignUpAspComponent', () => {
  let component: SignUpAspComponent;
  let fixture: ComponentFixture<SignUpAspComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpAspComponent]
    });
    fixture = TestBed.createComponent(SignUpAspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
