import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isTokenExpired()) {

    // Token inválido

    authService.removeToken();
    authService.removeUsuarioLogado();
    router.navigate(['/not-authorized']);
    return false;

  } 
  
  const usuarioLogado = authService.getUsuarioLogadoValue(); // Ex.: { id: 1, nome: 'Admin', role: 'FUNCIONARIO' }
  if (usuarioLogado?.funcionario) {
    router.navigate(['/not-authorized']);
    return false;
  }

  return true;

};