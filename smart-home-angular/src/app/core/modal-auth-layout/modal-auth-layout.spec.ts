import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAuthLayout } from './modal-auth-layout';

describe('ModalAuthLayout', () => {
  let component: ModalAuthLayout;
  let fixture: ComponentFixture<ModalAuthLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAuthLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalAuthLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
