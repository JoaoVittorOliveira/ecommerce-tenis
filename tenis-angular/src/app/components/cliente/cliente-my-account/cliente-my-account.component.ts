import { Component } from '@angular/core';
import { Cliente } from '../../../models/cliente.model';
import { AuthService } from '../../../services/auth.service';
import { ClienteService } from '../../../services/cliente.service'; 
import { Observable } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-cliente-my-account',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './cliente-my-account.component.html',
  styleUrl: './cliente-my-account.component.css'
})
export class ClienteMyAccountComponent {

  cliente: Observable<Cliente | null> = new Observable<Cliente | null>();

  constructor(private authService: AuthService, private clienteService: ClienteService) {}

  ngOnInit(): void {
    console.log(this.cliente);
    this.loadCliente();
    console.log(this.cliente);
  }

  private loadCliente(): void {
    const usuarioLogado = this.authService.getUsuarioLogadoValue();
    console.log('usuario logado:', usuarioLogado);
    if (usuarioLogado && usuarioLogado.cliente) {
      try {
        console.log('cliente',this.cliente);
        this.cliente = this.clienteService.findByUsername(usuarioLogado.username.toString());
      } catch (error) {
        console.log(error);
      }
      
      
    }
  }

}
