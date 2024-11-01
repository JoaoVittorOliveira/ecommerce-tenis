import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { Material } from '../../../models/material.model';
import { MaterialService } from '../../../services/material.service';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog-component';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-material-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, NgIf, MatInputModule, MatCardModule, MatToolbarModule],
  templateUrl: './material-form.component.html',
  styleUrl: './material-form.component.css'
})
export class MaterialFormComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private materialService: MaterialService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog) {

    const material: Material = this.activatedRoute.snapshot.data['material'];

    this.formGroup = this.formBuilder.group({
      id: [(material && material.id) ? material.id : null],
      
      descricao: [
        (material && material.descricao) ? material.descricao : '', [Validators.required,Validators.minLength(2),Validators.maxLength(60)]],
      
      categoria: [
        (material && material.categoria) ? material.categoria : '', Validators.required
      ]
    });

  }
  salvar() {
    if (this.formGroup.valid) {
      const material = this.formGroup.value;
      if (material.id == null) {
        this.materialService.insert(material).subscribe({
          next: (materialCadastrado) => {
            this.router.navigateByUrl('/materiais');
          },
          error: (errorResponse) => {
            console.log('Erro ao salvar', + JSON.stringify(errorResponse));
          }
        });
      } else {
        this.materialService.update(material).subscribe({
          next: (materialAlterado) => {
            this.router.navigateByUrl('/materiais');
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
      const material = this.formGroup.value;
      if (material.id != null) {
        
        const dialogRef = this.dialog.open(ConfirmDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.materialService.delete(material).subscribe({
              next: () => {
                this.router.navigateByUrl('/materiais');
              },
              error: (err) => {
                console.error('Erro ao tentar excluir o material', err);
              }
            });
          }
        });

      }

    }
  }

  cancelar(){
    this.router.navigateByUrl('/materiais');
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
    descricao : {
      required: 'A descrição deve ser informada.',
      minlength: 'A descrição deve conter ao menos 2 caracteres.',
      maxlength: 'A descrição deve conter no máximo 60 caracteres.'
    },
    categoria : {
      required: 'A categoria deve ser informada.'
    }
  }
}