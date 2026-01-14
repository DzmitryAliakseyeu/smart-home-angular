import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModeTabs } from './edit-mode-tabs';

describe('EditModeTabs', () => {
  let component: EditModeTabs;
  let fixture: ComponentFixture<EditModeTabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditModeTabs],
    }).compileComponents();

    fixture = TestBed.createComponent(EditModeTabs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
