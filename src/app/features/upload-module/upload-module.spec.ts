import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadModule } from './upload-module';

describe('UploadModule', () => {
  let component: UploadModule;
  let fixture: ComponentFixture<UploadModule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadModule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
