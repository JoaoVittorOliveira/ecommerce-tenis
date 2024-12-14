import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../../services/cliente.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Cliente } from '../../../models/cliente.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cliente-my-account',
  templateUrl: './cliente-my-account.component.html',
  styleUrls: ['./cliente-my-account.component.css'],
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule]
})
export class ClienteMyAccountComponent implements OnInit {

  formGroup: FormGroup;

  clienteLogado: Observable<Cliente> | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
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

    this.clienteLogado = this.clienteService.getMyAccount();

    console.log("clienteLogado: ", this.clienteLogado);

    this.clienteService.getMyAccount().subscribe({
      next: (cliente: Cliente) => {
        const { telefone, endereco, ...clienteData } = cliente;

        this.formGroup.patchValue({
          ...clienteData,
          ddd: telefone?.ddd,
          numero: telefone?.numero,
          cep: endereco?.cep,
          rua: endereco?.rua,
          complemento: endereco?.complemento
        });

        console.log(cliente);

        console.log('OnInit - Endereco:', endereco);
        console.log('OnInit - telefone:', telefone);
        console.log('OnInit - que:', clienteData);
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
}