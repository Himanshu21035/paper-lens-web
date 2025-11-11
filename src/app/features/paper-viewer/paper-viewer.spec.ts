import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperViewer } from './paper-viewer';

describe('PaperViewer', () => {
  let component: PaperViewer;
  let fixture: ComponentFixture<PaperViewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaperViewer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaperViewer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
