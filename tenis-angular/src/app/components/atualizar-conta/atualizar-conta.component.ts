import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ItemCarrinho } from '../../models/item-carrinho.model';
import { CarrinhoService } from '../../services/carrinho.service';
import { MatToolbar } from '@angular/material/toolbar';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { Usuario } from '../../models/usuario.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { ClientePasswordUpdateDTO } from '../../models/cliente-password-update.dto';
import { ClienteUsernameUpdateDTO } from '../../models/cliente-username-update.dto';
@Component({
  selector: 'app-atualizar-conta',
  standalone: true,
  imports: [CommonModule, MatToolbar,MatFormField,MatLabel,MatIcon,RouterLink,ReactiveFormsModule],
  templateUrl: './atualizar-conta.component.html',
  styleUrl: './atualizar-conta.component.css'
})

export class AtualizarContaComponent {
  passwordForm: FormGroup;
  usernameForm: FormGroup;

  constructor(private fb: FormBuilder, private clienteService: ClienteService) {
    // Inicializa os formulários
    this.passwordForm = this.fb.group({
      senhaAtual: ['', [Validators.required]],
      novaSenha: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.usernameForm = this.fb.group({
      novoUsername: ['', [Validators.required]],
    });
  }

  // Atualizar Senha
  atualizarSenha() {
    if (this.passwordForm.valid) {
      const dto: ClientePasswordUpdateDTO = this.passwordForm.value;

      this.clienteService.updatePassword(dto).subscribe({
        next: () => alert('Senha atualizada com sucesso!'),
        error: (err) => alert('Erro ao atualizar senha: ' + err.message),
      });
    }
  }

  // Atualizar Nome de Usuário
  atualizarUsername() {
    if (this.usernameForm.valid) {
      const dto: ClienteUsernameUpdateDTO = this.usernameForm.value;

      this.clienteService.updateUsername(dto).subscribe({
        next: () => alert('Nome de usuário atualizado com sucesso!'),
        error: (err) => alert('Erro ao atualizar nome de usuário: ' + err.message),
      });
    }
  }
}
