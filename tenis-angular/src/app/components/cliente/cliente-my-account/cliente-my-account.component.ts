import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../../services/cliente.service';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { Cliente } from '../../../models/cliente.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { Usuario } from '../../../models/usuario.model';
import { AuthService } from '../../../services/auth.service';
import { CarrinhoService } from '../../../services/carrinho.service';

@Component({
  selector: 'app-cliente-my-account',
  templateUrl: './cliente-my-account.component.html',
  styleUrls: ['./cliente-my-account.component.css'],
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule,CommonModule,MatToolbar,RouterLink,MatIcon]
})
export class ClienteMyAccountComponent implements OnInit {
    usuarioLogado: Usuario | null = null;
  private subscription = new Subscription();
  usuario: any = {};

  formGroup: FormGroup;

  clienteLogado: Observable<Cliente> | undefined;

  constructor(
            private authService: AuthService,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
        public carrinhoService: CarrinhoService,
    
    private router: Router,
    private dialog: MatDialog
  ) {
    this.formGroup = this.formBuilder.group({
      id: [null],
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      username: ['', Validators.required],
      senha: ['', Validators.required],
      ddd: ['', Validators.required],
      numero: ['', Validators.required],
      cep: ['', Validators.required],
      rua: ['', Validators.required],
      complemento: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.carregarUsuarioLogado();
    this.clienteLogado = this.clienteService.getMyAccount();

    this.clienteService.getMyAccount().subscribe(cliente => {
      this.usuario = cliente;
    });
    this.clienteService.getMyAccount().subscribe({
      next: (cliente: Cliente) => {
        const { telefone, endereco, ...clienteData } = cliente;

        this.formGroup.patchValue({
          ...clienteData,
          ddd: telefone?.ddd,
          numero: telefone?.numero,
          cep: this.usuario.listaEndereco[0].cep,
          rua: this.usuario.listaEndereco[0].rua,
          complemento: this.usuario.listaEndereco[0].complemento
        });
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro ao carregar os dados do cliente:', err.message);
      }
    });
    
  }

  salvar(): void {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.valid) {

      const cliente = this.formGroup.value;
      console.log(cliente);

      cliente.telefone = { ddd: cliente.ddd, numero: cliente.numero };
      cliente.endereco = { cep: cliente.cep, rua: cliente.rua, complemento: cliente.complemento };


      this.clienteService.updateMyAccount(cliente).subscribe({
        next: () => {
          alert('Dados atualizados com sucesso!');
        },
        error: (err: HttpErrorResponse) => {
          this.tratarErros(err);
        }
      });
    } else {
      console.error('Formulário inválido');
    }
  }

  tratarErros(errorResponse: HttpErrorResponse): void {
    if (errorResponse.status === 400 && errorResponse.error?.errors) {
      errorResponse.error.errors.forEach((validationError: any) => {
        const formControl = this.formGroup.get(validationError.fieldName);
        if (formControl) {
          formControl.setErrors({ apiError: validationError.message });
        }
      });
    } else {
      console.error('Erro genérico:', errorResponse.message);
    }
  }

  carregarUsuarioLogado(): void {
    this.subscription.add(
      this.authService.getUsuarioLogado().subscribe((usuario) => (this.usuarioLogado = usuario))
    );
  }

  deslogar(): void {
    this.authService.removeToken();
    this.authService.removeUsuarioLogado();
    window.location.reload();
  }
}
