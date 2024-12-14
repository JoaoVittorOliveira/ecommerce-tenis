import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
    RouterModule, MatIcon],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;

  perfil: number = 1; // já vai como cliente no forms por padrão

  constructor(
    private formBuilder: FormBuilder,
    private carrinhoService: CarrinhoService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) { 

  }
  voltarParaEcommerce() {
    this.router.navigate(['/ecommerce']); // Substitua com a rota correta
  } 
  ngOnInit(): void {

    // limpar carrinho
    this.carrinhoService.removerTudo();

    // deslogar
    this.authService.removeToken();
    this.authService.removeUsuarioLogado();

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // pegar do login-selection
    const state = history.state;
    if (state && state.perfil) {
      this.perfil = state.perfil;
    }
  }

  
  onSubmit() {

    if (this.loginForm.valid) {

      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      

      this.authService.login(username, password, this.perfil).subscribe ({
        next: (resp) => {
          if (this.perfil === 1) {
            this.router.navigateByUrl('/');
          } else if (this.perfil === 2) {
            this.router.navigateByUrl('/admin');
          }
        },
        error: (err) => {
          console.log('Erro no login', err);
          this.showSnackbarTopPosition("Username ou senha inválido");
        }
      })

    }

  }

  onRegister() {
    // criar usuário
  }

  showSnackbarTopPosition(content: any) {
    this.snackBar.open(content, 'fechar', {
      duration: 3000,
      verticalPosition: "top",
      horizontalPosition: "center"
    });
  }

}
