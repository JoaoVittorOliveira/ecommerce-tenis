
import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import {Router } from '@angular/router';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'success-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter(),
    {provide: MAT_DATE_LOCALE, useValue: 'pt-br'}
  ],
  imports: [MatIcon],
  templateUrl: './success-dialog.component.html',
  styleUrl: './success-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuccessDialog {
  constructor(
      private dialogRef: MatDialogRef<SuccessDialog>,
      @Inject(MAT_DIALOG_DATA) public data: { message: string },
      private router: Router
  ) {}

  redirect() {
      this.dialogRef.close();
      this.router.navigate(['/login']);
  }
}
