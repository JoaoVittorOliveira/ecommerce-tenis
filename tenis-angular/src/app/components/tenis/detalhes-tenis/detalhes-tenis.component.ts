import { Component, Inject } from '@angular/core';
import { Tenis } from '../../../models/tenis.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TenisService } from '../../../services/tenis.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-detalhes-tenis',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './detalhes-tenis.component.html',
  styleUrl: './detalhes-tenis.component.css'
})
export class DetalhesTenisComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public tenis: Tenis,
              public tenisService: TenisService,
              private dialogRef: MatDialogRef<DetalhesTenisComponent>) {

  }

  fecharDialog(): void {
    this.dialogRef.close();
  }
}
