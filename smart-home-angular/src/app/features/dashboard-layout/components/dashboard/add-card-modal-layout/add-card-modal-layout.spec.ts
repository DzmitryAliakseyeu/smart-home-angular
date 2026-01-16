import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCardModalLayout } from './add-card-modal-layout';

describe('AddCardModalLayout', () => {
  let component: AddCardModalLayout;
  let fixture: ComponentFixture<AddCardModalLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCardModalLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCardModalLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
