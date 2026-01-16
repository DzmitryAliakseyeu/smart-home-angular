import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModeCard } from './edit-mode-card';

describe('EditModeCard', () => {
  let component: EditModeCard;
  let fixture: ComponentFixture<EditModeCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditModeCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditModeCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
