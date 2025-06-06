import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NativeDialogComponent } from './native-dialog.component';

describe('DialogComponent', () => {
  let component: NativeDialogComponent;
  let fixture: ComponentFixture<NativeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NativeDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NativeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
