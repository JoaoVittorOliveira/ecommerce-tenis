import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginSelectionGuard implements CanActivate {

  private hasSelectedPerfil = false; // Controle interno para verificar a seleção

  constructor(private router: Router) {}

  // Método para definir se o perfil foi selecionado
  setPerfilSelected(value: boolean): void {
    this.hasSelectedPerfil = value;
  }

  canActivate(): boolean {
    if (!this.hasSelectedPerfil) {
      this.router.navigate(['/login-selection']); // Redireciona caso não tenha selecionado o perfil
      return false;
    }
    return true;
  }
}
