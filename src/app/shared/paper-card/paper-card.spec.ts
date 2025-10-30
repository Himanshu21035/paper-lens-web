import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperCard } from './paper-card';

describe('PaperCard', () => {
  let component: PaperCard;
  let fixture: ComponentFixture<PaperCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaperCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaperCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
