import { Component } from '@angular/core';
import { Cliente } from '../../../models/cliente.model';
import { AuthService } from '../../../services/auth.service';
import { ClienteService } from '../../../services/cliente.service'; 
import { Observable } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-cliente-my-account',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './cliente-my-account.component.html',
  styleUrl: './cliente-my-account.component.css'
})
export class ClienteMyAccountComponent {

  cliente: Observable<Cliente | null> = new Observable<Cliente | null>();
  usuarioLogado: Usuario | undefined;

  constructor(private authService: AuthService, private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.loadCliente();
    
  }

  private loadCliente(): void {
    const usuarioLogado = this.authService.getUsuarioLogadoValue();

    if (usuarioLogado) {
      this.cliente = this.clienteService.findByUsername(usuarioLogado.username.toString());
      this.usuarioLogado = usuarioLogado;
    }
  }

}
