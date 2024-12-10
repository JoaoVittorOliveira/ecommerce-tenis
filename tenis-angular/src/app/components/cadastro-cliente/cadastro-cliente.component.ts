import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Telefone } from '../../models/telefone.model';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog-component';
import { HttpErrorResponse } from '@angular/common/http';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-cadastro-cliente',
  standalone: true,
  providers: [provideNativeDateAdapter(),
    {provide: MAT_DATE_LOCALE, useValue: 'pt-br'}
  ],
  imports: [NgIf,FormsModule,ReactiveFormsModule, MatStepperModule ,MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, RouterModule, MatSelectModule, MatIcon, MatDatepickerModule],
  templateUrl: './cadastro-cliente.component.html',
  styleUrl: './cadastro-cliente.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CadastroClienteComponent {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    // Inicializa os grupos de formulário para cada etapa
    this.firstFormGroup = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      dataNascimento: ['', Validators.required],
    });

    this.secondFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      senha: ['', Validators.required],
    });

    this.thirdFormGroup = this.formBuilder.group({
      ddd: ['', Validators.required],
      numero: ['', Validators.required],
      cep: ['', Validators.required],
      rua: ['', Validators.required],
      complemento: ['', Validators.required],
    });
  }
  salvar() {}
/*
  salvar() {
    // Valida se os formulários são válidos
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid) {
      const cliente = {
        id: null,  // Se for um novo cliente, você pode deixar o id como null
        nome: this.firstFormGroup.get('nome')?.value,
        cpf: this.firstFormGroup.get('cpf')?.value,
        dataNascimento: this.firstFormGroup.get('dataNascimento')?.value,
        usuario: {
          username: this.secondFormGroup.get('username')?.value,  // Valor do formulário
          senha: this.secondFormGroup.get('senha')?.value         // Valor do formulário
        },
        telefone: {
          ddd: this.thirdFormGroup.get('ddd')?.value,
          numero: this.thirdFormGroup.get('numero')?.value
        },
        endereco: {
          cep: this.thirdFormGroup.get('cep')?.value,
          rua: this.thirdFormGroup.get('rua')?.value,
          complemento: this.thirdFormGroup.get('complemento')?.value
        },
        usuariots: new Date()  // Definindo a data de criação ou atualização
      };
  
      // Envia os dados ao servidor
      this.clienteService.insert(cliente).subscribe({
        next: (clienteCadastrado) => {
          this.router.navigateByUrl('/admin/clientes');
        },
        error: (err) => {
          console.error('Erro ao salvar cliente:', err);
        }
      });
    } else {
      console.log("Formulários inválidos");
    }
  }
  

  tratarErros(errorResponse: HttpErrorResponse) {
    if (errorResponse.status === 400) {
      if (errorResponse.error?.errors) {
        errorResponse.error.errors.forEach((validationError: any) => {
          const formControl = this.firstFormGroup.get(validationError.fieldName);
          if (formControl) {
            formControl.setErrors({ apiError: validationError.message });
          }
        });
      }
    } else if (errorResponse.status < 400) {
      alert(errorResponse.error?.message || 'Erro genérico do envio do formulário.');
    } else if (errorResponse.status >= 500) {
      alert(errorResponse.error?.details);
    }
  }

  getErrorMessage(controlName: string, errors: ValidationErrors | null | undefined): string {
    if (!errors) {
      return '';
    }
    for (const errorName in errors) {
      if (errors.hasOwnProperty(errorName) && this.errorMessages[controlName][errorName]) {
        return this.errorMessages[controlName][errorName];
      }
    }
    return 'invalid field';
  }

  errorMessages: { [controlName: string]: { [errorName: string]: string } } = {
    nome: {
      required: 'O nome deve ser informado.',
      minlength: 'O nome deve conter ao menos 3 letras.',
      maxlength: 'O nome deve conter no máximo 80 letras.'
    },
    cpf: {
      required: 'O cpf deve ser informado.',
      minlength: 'O cpf deve conter ao menos 8 caracteres.',
      maxlength: 'O cpf deve conter no máximo 15 caracteres.'
    },
    username: {
      required: 'O username deve ser informado.',
      minlength: 'O username deve conter ao menos 3 caracteres.',
      maxlength: 'O username deve conter no máximo 60 caracteres.',
      apiError: ' '
    },
    senha: {
      required: 'A senha deve ser informada.',
      minlength: 'A senha deve conter ao menos 6 caracteres.',
      maxlength: 'A senha deve conter no máximo 60 caracteres.'
    },
    ddd: {
      required: 'O ddd deve ser informado.',
      minlength: 'O ddd deve conter 2 numeros.',
      maxlength: 'O ddd deve conter 2 numeros.'
    },
    numero: {
      required: 'O numero deve ser informado.',
      minlength: 'O numero deve conter 9 numeros.',
      maxlength: 'O numero deve conter 9 numeros.'
    },
    cep: {
      required: 'O cep deve ser informado.',
      minlength: 'O numero deve conter 8 numeros.',
      maxlength: 'O numero deve conter 8 numeros.'
    },
    rua: {
      required: 'A rua deve ser informada.',
      minlength: 'A rua deve conter 4 caracteres.',
      maxlength: 'A rua deve conter 50 caracteres.'
    },
    complemento: {
      required: 'O complemento deve ser informado.',
      minlength: 'O complemento deve conter 8 caracteres.',
      maxlength: 'O complemento deve conter 8 caracteres.'
    },
  }*/
}
