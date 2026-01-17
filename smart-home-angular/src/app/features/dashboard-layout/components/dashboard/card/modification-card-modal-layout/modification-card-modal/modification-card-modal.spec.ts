import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationCardModal } from './modification-card-modal';

describe('ModificationCardModal', () => {
  let component: ModificationCardModal;
  let fixture: ComponentFixture<ModificationCardModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificationCardModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificationCardModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
