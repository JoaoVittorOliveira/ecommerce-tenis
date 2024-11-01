import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MarcaService } from '../../../services/marca.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Marca } from '../../../models/marca.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog-component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-marca-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, NgIf, MatInputModule, MatCardModule, MatToolbarModule],
  templateUrl: './marca-form.component.html',
  styleUrl: './marca-form.component.css'
})
export class MarcaFormComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private marcaService: MarcaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog) {

    const marca: Marca = this.activatedRoute.snapshot.data['marca'];

    this.formGroup = this.formBuilder.group({
      id: [(marca && marca.id) ? marca.id : null],
      
      nome: [
        (marca && marca.nome) ? marca.nome : '', [Validators.required,Validators.minLength(2),Validators.maxLength(60)]],
      
      logo: [
        (marca && marca.logo) ? marca.logo : '', [Validators.required]
      ]
    });

  }

  
  salvar() {
    if (this.formGroup.valid) {
      const marca = this.formGroup.value;
      if (marca.id == null) {
        this.marcaService.insert(marca).subscribe({
          next: (marcaCadastrado) => {
            this.router.navigateByUrl('/marcas');
          },
          error: (errorResponse) => {
            console.log('Erro ao salvar', + JSON.stringify(errorResponse));
          }
        });
      } else {
        this.marcaService.update(marca).subscribe({
          next: (marcaAlterado) => {
            this.router.navigateByUrl('/marcas');
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
      const marca = this.formGroup.value;
      if (marca.id != null) {

        const dialogRef = this.dialog.open(ConfirmDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.marcaService.delete(marca).subscribe({
              next: () => {
                this.router.navigateByUrl('/marcas');
              },
              error: (err) => {
                console.error('Erro ao tentar excluir o marca', err);
              }
            });
          }
        });

      }
    }
  }

  cancelar(){
    this.router.navigateByUrl('/marcas');
  }

  tratarErros(errorResponse: HttpErrorResponse) {
    if (errorResponse.status === 400) {
      if (errorResponse.error?.errors) {
        errorResponse.error.errors.forEach((validationError: any) => {
          const formControl = this.formGroup.get(validationError.fieldName);
          if (formControl) {
            formControl.setErrors({apiError: validationError.message})
          }
        });
      }
    } else if (errorResponse.status < 400){
      alert(errorResponse.error?.message || 'Erro genérico do envio do formulário.');
    } else if (errorResponse.status >= 500) {

      //melhorar isso (duplicar username/cpf)
      alert(errorResponse.error?.details);
    }
  }

  getErrorMessage(controlName : string, errors: ValidationErrors | null | undefined): string {
    if (!errors){
      return '';
    }
    for (const errorName in errors) {
      if (errors.hasOwnProperty(errorName) && this.errorMessages[controlName][errorName]){
        return this.errorMessages[controlName][errorName];
      }
    }

    return 'invalid field';
  }

  errorMessages: {[controlName: string]: {[errorName: string]: string}} = {
    nome : {
      required: 'O nome deve ser informado.',
      minlength: 'O nome deve conter ao menos 2 caracteres.',
      maxlength: 'O nome deve conter no máximo 60 caracteres.'
    },
    logo : {
      required: 'A URL da logo deve ser informada.',
    }
  }
}