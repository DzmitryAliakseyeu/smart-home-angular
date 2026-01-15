import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewTabModal } from './add-new-tab-modal';

describe('AddNewTabModal', () => {
  let component: AddNewTabModal;
  let fixture: ComponentFixture<AddNewTabModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewTabModal],
    }).compileComponents();

    fixture = TestBed.createComponent(AddNewTabModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
