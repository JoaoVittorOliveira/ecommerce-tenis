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
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpErrorResponse } from '@angular/common/http';
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
  isLinear = false;
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
      id: [null],
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

  ngOnInit(): void {
    this.clienteService.findAll().subscribe(data=> {
      this.initializeForm();
    })
  }

  initializeForm(): void {
    
    const cliente = this.activatedRoute.snapshot.data['cliente'];
    const isCadastro = !cliente || !cliente.id;
    
    this.firstFormGroup = this.formBuilder.group({
      id: [
        (cliente && cliente.id) ? cliente.id : null
      ],
      nome: [
        (cliente && cliente.nome) ? cliente.nome : null, 
        Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(80)])
      ],
      cpf: [
        (cliente && cliente.cpf !== null && cliente.cpf !== undefined) ? cliente.cpf : '', 
        Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(15)])
      ],
      dataNascimento: [
        (cliente && cliente.dataNascimento !== null && cliente.dataNascimento !== undefined) ? cliente.dataNascimento : '',
        Validators.compose([Validators.required])
      ],});

      this.secondFormGroup = this.formBuilder.group({
      
      username: [
        (cliente && cliente.usuario.username) ? cliente.usuario.username : '', 
        Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(60)])
      ],

      // Se for cadastro, validar por tamanho, se for update, validar só se existe
      senha: [
        cliente?.usuario?.senha || '', 
        isCadastro 
        ? Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(60)])
        : Validators.compose([Validators.required])
      ],});

      this.thirdFormGroup= this.formBuilder.group({
      ddd: [
        (cliente && cliente.telefone && cliente.telefone.ddd) ? cliente.telefone.ddd : '', 
        Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(2)])
      ],
      numero: [
        (cliente && cliente.telefone && cliente.telefone.numero) ? cliente.telefone.numero : '', 
        Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(9)])
      ],

/*0 */
      cep: [
        (cliente && cliente.endereco && cliente.endereco.cep) ? cliente.endereco.cep : '', 
        Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(8)])
      ],
      rua: [
        (cliente && cliente.rua && cliente.endereco.rua) ? cliente.endereco.rua : '', 
        Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(50)])
      ],
      complemento: [
        (cliente && cliente.endereco && cliente.endereco.complemento) ? cliente.endereco.complemento : '', 
        Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(50)])
      ]

      
    })

  }


  salvar() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid) {
      const cliente = {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value,
        ...this.thirdFormGroup.value
      };  

      if (!cliente.telefone) {
        cliente.telefone = { ddd: cliente.ddd, numero: cliente.numero };
      }
      
      if (!cliente.usuario) {
        cliente.usuario = { username: cliente.username, senha: cliente.senha }; 
      }

      if (!cliente.endereco) {
        cliente.endereco = { cep: cliente.cep, rua: cliente.rua, complemento:cliente.complemento }; 
      }

      
      console.log('Cliente enviado:', cliente);
  
      // Envia ao clienteService para salvar
      this.clienteService.insert(cliente).subscribe({
        next: () => {
          this.router.navigateByUrl('/admin/clientes');
        },
        error: (err) => {
          console.error('Erro ao salvar cliente:', err);
        }
      });
    } else {
      console.log('Formulários inválidos');
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
  }
}
