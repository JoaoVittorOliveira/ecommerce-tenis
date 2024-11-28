import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Telefone } from '../../../models/telefone.model';
import { FuncionarioService } from '../../../services/funcionario.service';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog-component';
import { Funcionario } from '../../../models/funcionario.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-funcionario-form',
  standalone: true,
  providers: [provideNativeDateAdapter(),
    {provide: MAT_DATE_LOCALE, useValue: 'pt-br'}
  ],
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, RouterModule, MatSelectModule, MatIcon, MatDatepickerModule],
  templateUrl: './funcionario-form.component.html',
  styleUrl: './funcionario-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FuncionarioFormComponent {

  formGroup: FormGroup;
  funcionarios: Funcionario[] = [];
  

  constructor(private formBuilder: FormBuilder,
    private funcionarioService: FuncionarioService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute) {
    this.formGroup = this.formBuilder.group({
      id: [null],
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      codigoAdmissao: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      dataAdmissao: ['', Validators.required],

      //usuario
      username: ['', Validators.required],
      senha: ['', Validators.required],

      //telefone
      ddd: ['', Validators.required],
      numero: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.funcionarioService.findAll().subscribe(data=> {
      this.funcionarios = data;
      this.initializeForm();
    })
  }

  initializeForm(): void {
    
    const funcionario = this.activatedRoute.snapshot.data['funcionario'];
    const isCadastro = !funcionario || !funcionario.id;
    
    this.formGroup = this.formBuilder.group({
      id: [
        (funcionario && funcionario.id) ? funcionario.id : null
      ],
      nome: [
        (funcionario && funcionario.nome) ? funcionario.nome : null, 
        Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(80)])
      ],
      cpf: [
        (funcionario && funcionario.cpf !== null && funcionario.cpf !== undefined) ? funcionario.cpf : '', 
        Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(15)])
      ],
      dataAdmissao: [
        (funcionario && funcionario.dataAdmissao !== null && funcionario.dataAdmissao !== undefined) ? funcionario.dataAdmissao : '',
        Validators.compose([Validators.required])
      ],
      dataNascimento: [
        (funcionario && funcionario.dataNascimento !== null && funcionario.dataNascimento !== undefined) ? funcionario.dataNascimento : '',
        Validators.compose([Validators.required])
      ],
      codigoAdmissao: [
        (funcionario && funcionario.codigoAdmissao !== null && funcionario.codigoAdmissao !== undefined) ? funcionario.codigoAdmissao : '',
        Validators.compose([Validators.required])
      ],
      username: [
        (funcionario && funcionario.usuario.username) ? funcionario.usuario.username : '', 
        Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(60)])
      ],

      // Se for cadastro, validar por tamanho, se for update, validar só se existe
      senha: [
        funcionario?.usuario?.senha || '', 
        isCadastro 
        ? Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(60)])
        : Validators.compose([Validators.required])
      ],

      ddd: [
        (funcionario && funcionario.telefone && funcionario.telefone.ddd) ? funcionario.telefone.ddd : '', 
        Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(2)])
      ],
      numero: [
        (funcionario && funcionario.telefone && funcionario.telefone.numero) ? funcionario.telefone.numero : '', 
        Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(9)])
      ]

      
    })

  }

  salvar() {
    
    console.log(this.formGroup.get('senha')?.removeValidators(Validators.maxLength(60)))
    this.formGroup.updateValueAndValidity();

    this.formGroup.markAllAsTouched();
    
    //console.log(this.formGroup.get("senha")?.clearValidators());
    if (this.formGroup.valid) {

      const funcionario = this.formGroup.value;

      if (!funcionario.telefone) {
        funcionario.telefone = { ddd: funcionario.ddd, numero: funcionario.numero };
      }
      
      if (!funcionario.usuario) {
        funcionario.usuario = { username: funcionario.username, senha: funcionario.senha }; 
      }

      if (funcionario.id == null) {
        this.funcionarioService.insert(funcionario).subscribe({
          next: (funcionarioCadastrado) => {
            this.router.navigateByUrl('/admin/funcionarios');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
            this.tratarErros(err);
          }
        });
      } else {
        this.funcionarioService.update(funcionario).subscribe({
          next: (funcionarioAlterado) => {
            this.router.navigateByUrl('/admin/funcionarios');
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
      const funcionario = this.formGroup.value;
      if (funcionario.id != null) {

        const dialogRef = this.dialog.open(ConfirmDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.funcionarioService.delete(funcionario).subscribe({
              next: () => {
                this.router.navigateByUrl('/admin/funcionarios');
              },
              error: (err) => {
                console.error('Erro ao tentar excluir o funcionario', err);
              }
            });
          }
        });

      }
    }
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

    } else if (errorResponse.status === 409){

      // Duplicata de username
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
      
      alert('Erro interno do servidor.');

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
      minlength: 'O nome deve conter ao menos 3 letras.',
      maxlength: 'O nome deve conter no máximo 80 letras.'
    },
    cpf : {
      required: 'O cpf deve ser informado.',
      minlength: 'O cpf deve conter ao menos 8 caracteres.',
      maxlength: 'O cpf deve conter no máximo 15 caracteres.',
      apiError: ' '
    },
    codigoAdmissao : {
      required: 'O codigo de admissao deve ser informado.',
    },
    username : {
      required: 'O username deve ser informado.',
      minlength: 'O username deve conter ao menos 3 caracteres.',
      maxlength: 'O username deve conter no máximo 60 caracteres.',
      apiError: ' '
    },
    senha : {
      required: 'A senha deve ser informado.',
      minlength: 'A senha deve conter ao menos 6 caracteres.',
      maxlength: 'A senha deve conter no máximo 60 caracteres.'
    },
    ddd : {
      required: 'O ddd deve ser informado.',
      minlength: 'O ddd deve conter 2 numeros.',
      maxlength: 'O ddd deve conter 2 numeros.'
    },
    numero : {
      required: 'O numero deve ser informado.',
      minlength: 'O numero deve conter 9 numeros.',
      maxlength: 'O numero deve conter 9 numeros.'
    },
  }

}
