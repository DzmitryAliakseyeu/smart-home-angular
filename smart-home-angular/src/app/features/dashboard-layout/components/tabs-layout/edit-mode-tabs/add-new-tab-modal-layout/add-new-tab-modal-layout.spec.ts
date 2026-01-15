import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewTabModalLayout } from './add-new-tab-modal-layout';

describe('AddNewTabModalLayout', () => {
  let component: AddNewTabModalLayout;
  let fixture: ComponentFixture<AddNewTabModalLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewTabModalLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(AddNewTabModalLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
