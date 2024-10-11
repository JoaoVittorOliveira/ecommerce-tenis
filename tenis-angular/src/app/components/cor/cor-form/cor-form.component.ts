import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CorService } from '../../../services/cor.service';
import { Cor } from '../../../models/cor.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog-component';

@Component({
  selector: 'app-cor-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, 
    RouterModule, MatSelectModule],
  templateUrl: './cor-form.component.html',
  styleUrl: './cor-form.component.css'
})
export class CorFormComponent {
  
  formGroup: FormGroup;
  cores: Cor[] = [];

  constructor(private formBuilder: FormBuilder,
    private corService: CorService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog) {
    this.formGroup = this.formBuilder.group({
      id: [null],
      nome: ['', Validators.required],
      codigoHex: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.corService.findAll().subscribe(data=> {
      this.cores = data;
      this.initializeForm();
    })
  }

  initializeForm(): void {
    
    const cor: Cor = this.activatedRoute.snapshot.data['cor'];
    
    this.formGroup = this.formBuilder.group({
      id: [
        (cor && cor.id) ? cor.id : null
      ],
      nome: [
        (cor && cor.nome) ? cor.nome : null, 
        Validators.compose([Validators.required, Validators.minLength(2),Validators.maxLength(20)])
      ],
      codigoHex: [
        (cor && cor.codigoHex) ? cor.codigoHex : null, 
        Validators.compose([Validators.required, Validators.minLength(7),Validators.maxLength(7)])
      ]
    })

  }

  salvar() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const cor = this.formGroup.value;

      // NOVO CADASTRO
      if (cor.id ==null) {
        this.corService.insert(cor).subscribe({
          next: (corCadastrada) => {
            this.router.navigateByUrl('/cores');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } 
      // ATUALIZAR CADASTRO
      else {
        this.corService.update(cor).subscribe({
          next: (corAlterada) => {
            this.router.navigateByUrl('/cores');
          },
          error: (err) => {
            console.log('Erro ao Editar' + JSON.stringify(err));
          }
        });
      }
    } else {
      console.log("Formulário inválido.")
    }
  }

  excluir() {
    if (this.formGroup.valid) {
      const cor = this.formGroup.value;
      if (cor.id != null) {

        const dialogRef = this.dialog.open(ConfirmDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.corService.delete(cor).subscribe({
              next: () => {
                this.router.navigateByUrl('/cores');
              },
              error: (err) => {
                console.error('Erro ao tentar excluir o cor', err);
              }
            });
          }
        });
        


      }
    }
  }

  errorMessages: {[controlName: string]: {[errorName: string]: string}} = {
    nome : {
      required: 'O nome deve ser informado.',
      minlength: 'O nome deve conter ao menos 2 letras.',
      maxlength: 'O nome deve conter no máximo 20 letras.',
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


}
