import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationCardModalLayout } from './modification-card-modal-layout';

describe('ModificationCardModalLayout', () => {
  let component: ModificationCardModalLayout;
  let fixture: ComponentFixture<ModificationCardModalLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificationCardModalLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificationCardModalLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
