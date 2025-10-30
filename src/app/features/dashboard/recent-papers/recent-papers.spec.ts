import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentPapers } from './recent-papers';

describe('RecentPapers', () => {
  let component: RecentPapers;
  let fixture: ComponentFixture<RecentPapers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentPapers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentPapers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
