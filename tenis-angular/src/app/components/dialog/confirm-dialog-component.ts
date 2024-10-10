import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  styleUrls: ['./confirm-dialog-component.css'],
  template: `
    <h3 mat-dialog-title>Tem certeza de que deseja excluir este endereço?</h3>
<div mat-dialog-content>
  Essa ação não poderá ser revertida!
</div>
<div mat-dialog-actions>
  <button mat-button class="cancel" (click)="onCancel()">Cancelar</button>
  <button mat-button class="confirm" (click)="onConfirm()">Excluir</button>
</div>
  `,
})
export class ConfirmDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
