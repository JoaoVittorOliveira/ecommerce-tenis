
import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import {Router } from '@angular/router';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'delete-dialog-error',
  standalone: true,
  providers: [provideNativeDateAdapter(),
    {provide: MAT_DATE_LOCALE, useValue: 'pt-br'}
  ],
  imports: [MatIcon],
  templateUrl: './delete-dialog-error.component.html',
  styleUrl: './delete-dialog-error.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteDialogError {
  constructor(
      private dialogRef: MatDialogRef<DeleteDialogError>,
      @Inject(MAT_DIALOG_DATA) public data: { message: string },
      private router: Router
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  redirect() {
      this.dialogRef.close();
      this.router.navigate(['/login']);
  }
}
