import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginSelectionGuard } from '../../../guards/login-selection.guard';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-login-selection',
  templateUrl: './login-selection.component.html',
  styleUrls: ['./login-selection.component.css'],
  standalone: true,
  imports: [MatIcon]
})
export class LoginSelectionComponent {

  constructor(
    private router: Router,
    private loginSelectionGuard: LoginSelectionGuard
  ) {}

  selectPerfil(perfil: number): void {
    this.loginSelectionGuard.setPerfilSelected(true); 
    this.router.navigate(['/login'], { state: { perfil } }); 
  }
}
