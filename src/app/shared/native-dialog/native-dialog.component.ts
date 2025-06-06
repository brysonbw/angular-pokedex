import { Component, ElementRef, output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-native-dialog',
  imports: [],
  templateUrl: './native-dialog.component.html',
  styleUrl: './native-dialog.component.css',
})
export class NativeDialogComponent {
  @ViewChild('dialogRef') dialogRef!: ElementRef<HTMLDialogElement>;
  isDialogOpen = false;
  closeDialog = output<void>();
  title!: string | null;

  open(): void {
    this.dialogRef.nativeElement.showModal();
    this.isDialogOpen = true;
  }

  close(): void {
    this.dialogRef.nativeElement.close();
    this.isDialogOpen = false;
    this.title = null;
    this.closeDialog.emit();
  }
}
