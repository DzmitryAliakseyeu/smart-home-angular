import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAuth } from './modal-auth';

describe('ModalAuth', () => {
  let component: ModalAuth;
  let fixture: ComponentFixture<ModalAuth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAuth],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalAuth);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
