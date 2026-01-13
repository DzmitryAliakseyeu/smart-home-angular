import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModeDashboard } from './edit-mode-dashboard';

describe('EditModeDashboard', () => {
  let component: EditModeDashboard;
  let fixture: ComponentFixture<EditModeDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditModeDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(EditModeDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
