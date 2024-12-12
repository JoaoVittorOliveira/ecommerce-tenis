import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { Usuario } from "../models/usuario.model";
import { JwtHelperService } from "@auth0/angular-jwt";
import { LocalStorageService } from "./local-storage.service";
import { Funcionario } from "../models/funcionario.model";
import { Cliente } from "../models/cliente.model";


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private baseUrl = 'http://localhost:8080/auth';
    private tokenKey = 'jwt_token';
    private usuarioLogadoKey = 'usuario_logado';
    private usuarioLogadoSubject = new BehaviorSubject<Usuario|null>(null);

    constructor(private httpClient: HttpClient,
                private localStorageService: LocalStorageService,
                private jwtHelper: JwtHelperService
    ) {
      this.initUsuarioLogado();
    }

    private initUsuarioLogado():void {
      const usuario = this.localStorageService.getItem(this.usuarioLogadoKey);
      if (usuario) {
        // const usuarioLogado = JSON.parse(usuario);
        this.usuarioLogadoSubject.next(usuario);
      }
    }

    public login(username: string, senha: string, perfil: number): Observable<any> {
      const params = {
        username: username,
        senha: senha,
        perfil: perfil // 1 para Admin (Funcionario), 2 para Cliente, etc.
      };

      
    
      return this.httpClient.post(`${this.baseUrl}`, params, { observe: 'response' }).pipe(
        tap((res: any) => {
          
          const authToken = res.headers.get('Authorization') ?? '';

          if (authToken) {
            this.setToken(authToken);
            const usuarioLogado = res.body;
            console.log('Really user:', usuarioLogado);
            if (usuarioLogado) {
              this.setUsuarioLogado(usuarioLogado);
              this.usuarioLogadoSubject.next(usuarioLogado);
            }
          }

        })
      );
    }
  
    setUsuarioLogado(usuario: Usuario): void {
      this.localStorageService.setItem(this.usuarioLogadoKey, usuario);

      this.usuarioLogadoSubject.next(usuario);

    if (usuario.perfil === 'Cliente') {
        this.httpClient.get<Cliente>(`http://localhost:8080/clientes/${usuario.id}`).subscribe(cliente => {
            usuario['cliente'] = cliente; 
            this.setUsuarioLogado(usuario);
        });
    } else if (usuario.perfil === 'Funcionario') {
        this.httpClient.get<Funcionario>(`http://localhost:8080/funcionarios/${usuario.id}`).subscribe(funcionario => {
            usuario['funcionario'] = funcionario; 
            this.setUsuarioLogado(usuario);
        });
    }
    }

    setToken(token: string): void {
      this.localStorageService.setItem(this.tokenKey, token);

      // Decodificar token para obter o perfil
      const decodedToken = this.jwtHelper.decodeToken(token);
      const perfil = decodedToken.groups?.[0]; // Supondo que o grupo seja algo como 'Cliente' ou 'Funcionario'
      
      const usuarioLogado = this.usuarioLogadoSubject.value;
      if (usuarioLogado) {
        usuarioLogado.perfil = perfil; // Adiciona o perfil ao usuário logado
        this.setUsuarioLogado(usuarioLogado);
        this.usuarioLogadoSubject.next(usuarioLogado);
      }
    }

    getUsuarioLogado() {
      return this.usuarioLogadoSubject.asObservable();
    }

    getUsuarioLogadoValue(): Usuario | null {
      return this.usuarioLogadoSubject.value;
    }

    getToken(): string | null {
      return this.localStorageService.getItem(this.tokenKey);
    }

    removeToken(): void {
      this.localStorageService.removeItem(this.tokenKey);
    }
    
    removeUsuarioLogado() :void {
      this.localStorageService.removeItem(this.usuarioLogadoKey);
      this.usuarioLogadoSubject.next(null);
    }

    isTokenExpired(): boolean {
      const token = this.getToken();
      if (!token) {
          return true;
      }
      try {
          return this.jwtHelper.isTokenExpired(token);
      } catch (error) {
          console.error('Token invalido', error);
          return true;
      }
    }

    getPerfilUsuario(): Observable<string | null> {
      return this.getUsuarioLogado().pipe(
          map(usuario => usuario ? usuario.perfil : null)
      );
    }
}