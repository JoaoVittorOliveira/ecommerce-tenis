import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
    console.log(funcionario)
    
    this.formGroup = this.formBuilder.group({
      id: [
        (funcionario && funcionario.id) ? funcionario.id : null
      ],
      nome: [
        (funcionario && funcionario.nome) ? funcionario.nome : null, 
        Validators.compose([Validators.required])
      ],
      cpf: [
        (funcionario && funcionario.cpf !== null && funcionario.cpf !== undefined) ? funcionario.cpf : 0, 
        Validators.compose([Validators.required])
      ],
      dataAdmissao: [
        (funcionario && funcionario.dataAdmissao !== null && funcionario.dataAdmissao !== undefined) ? funcionario.dataAdmissao : 0,
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
        (funcionario && funcionario.usuario && funcionario.usuario.username) ? funcionario.usuario.username : '', 
        Validators.required
      ],
      senha: [
        (funcionario && funcionario.usuario && funcionario.usuario.senha) ? funcionario.usuario.senha : '', 
        Validators.required
      ],
      ddd: [
        (funcionario && funcionario.telefone && funcionario.telefone.ddd) ? funcionario.telefone.ddd : '', 
        Validators.required
      ],
      numero: [
        (funcionario && funcionario.telefone && funcionario.telefone.numero) ? funcionario.telefone.numero : '', 
        Validators.required
      ]

      
    })

    
  }

  salvar() {
    this.formGroup.markAllAsTouched();
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
            this.router.navigateByUrl('/funcionarios');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.funcionarioService.update(funcionario).subscribe({
          next: (funcionarioAlterado) => {
            this.router.navigateByUrl('/funcionarios');
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
                this.router.navigateByUrl('/funcionarios');
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
}
