import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EnderecoService } from '../../../services/endereco.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Endereco } from '../../../models/endereco.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog-component';

@Component({
  selector: 'app-endereco-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, NgIf, MatInputModule, MatCardModule, MatToolbarModule],
  templateUrl: './endereco-form.component.html',
  styleUrl: './endereco-form.component.css'
})
export class EnderecoFormComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private enderecoService: EnderecoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog) {

    const endereco: Endereco = this.activatedRoute.snapshot.data['endereco'];

    this.formGroup = formBuilder.group({
      
      id: [(endereco && endereco.id) ? endereco.id : null],
      cep: [(endereco && endereco.cep) ? endereco.cep : '', [Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
      rua: [(endereco && endereco.rua) ? endereco.rua : '', Validators.required],
      complemento: [(endereco && endereco.complemento) ? endereco.complemento : '', Validators.required]
    })
  }
  salvar() {
    if (this.formGroup.valid) {
      const endereco = this.formGroup.value;
      if (endereco.id == null) {
        this.enderecoService.insert(endereco).subscribe({
          next: (enderecoCadastrado) => {
            this.router.navigateByUrl('/enderecos');
          },
          error: (errorResponse) => {
            console.log('Erro ao salvar', + JSON.stringify(errorResponse));
          }
        });
      } else {
        this.enderecoService.update(endereco).subscribe({
          next: (enderecoAlterado) => {
            this.router.navigateByUrl('/enderecos');
          },
          error: (err) => {
            console.log('Erro ao salvar', + JSON.stringify(err));
          }
        });
      }
    }
  }

  excluir() {
    if (this.formGroup.valid) {
      const endereco = this.formGroup.value;
      if (endereco.id != null) {

        const dialogRef = this.dialog.open(ConfirmDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.enderecoService.delete(endereco).subscribe({
              next: () => {
                this.router.navigateByUrl('/enderecos');
              },
              error: (err) => {
                console.error('Erro ao tentar excluir o endereco', err);
              }
            });
          }
        });

      }
    }
  }

  cancelar(){
    this.router.navigateByUrl('/enderecos');
  }
}