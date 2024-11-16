import { Component } from '@angular/core';

import { Categoria } from '../../../models/categoria.model';
import { CategoriaService } from '../../../services/categoria.service';

import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog-component';


@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, 
    RouterModule, MatSelectModule],
  templateUrl: './categoria-form.component.html',
  styleUrl: './categoria-form.component.css'
})
export class CategoriaFormComponent {

  formGroup: FormGroup;
  categorias: Categoria[] = [];

  constructor(private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog) 
  {
      
    this.formGroup = this.formBuilder.group({
      id: [null],
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      genero: ['', Validators.required],
      faixaEtaria: ['', Validators.required]
    })

  }

  ngOnInit(): void {
    this.categoriaService.findAll().subscribe(data=> {
      this.categorias = data;
      this.initializeForm();
    })
  }

  initializeForm(): void {
    
    const categoria: Categoria = this.activatedRoute.snapshot.data['categoria'];
    
    this.formGroup = this.formBuilder.group({
      id: [
        (categoria && categoria.id) ? categoria.id : null
      ],
      nome: [
        (categoria && categoria.nome) ? categoria.nome : null, 
        Validators.compose([Validators.required, Validators.minLength(2),Validators.maxLength(20)])
      ],
      descricao: [
        (categoria && categoria.descricao) ? categoria.descricao : null, 
        Validators.compose([Validators.required, Validators.minLength(10),Validators.maxLength(200)])
      ],
      genero: [
        (categoria && categoria.genero) ? categoria.genero : null,
        Validators.compose([Validators.required])
      ],
      faixaEtaria: [
        (categoria && categoria.faixaEtaria) ? categoria.faixaEtaria : null,
        Validators.compose([Validators.required])
      ]
    })

  }

  salvar() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const categoria = this.formGroup.value;

      // NOVO CADASTRO
      if (categoria.id ==null) {
        this.categoriaService.insert(categoria).subscribe({
          next: (categoriaCadastrada) => {
            this.router.navigateByUrl('/admin/categorias');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } 
      // ATUALIZAR CADASTRO
      else {
        this.categoriaService.update(categoria).subscribe({
          next: (categoriaAlterada) => {
            this.router.navigateByUrl('/admin/categorias');
          },
          error: (err) => {
            console.log('Erro ao Editar' + JSON.stringify(err));
          }
        });
      }
    } else {
      console.log("Formulário inválido.")
    }
  }

  excluir() {
    if (this.formGroup.valid) {
      const categoria = this.formGroup.value;
      if (categoria.id != null) {

        const dialogRef = this.dialog.open(ConfirmDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.categoriaService.delete(categoria).subscribe({
              next: () => {
                this.router.navigateByUrl('/admin/categorias');
              },
              error: (err) => {
                console.error('Erro ao tentar excluir a categoria', err);
              }
            });
          }
        });
      }
    }
  }

  errorMessages: {[controlName: string]: {[errorName: string]: string}} = {
    nome : {
      required: 'O nome deve ser informado.',
      minlength: 'O nome deve conter ao menos 2 letras.',
      maxlength: 'O nome deve conter no máximo 20 letras.',
    },
    descricao: {
      required: 'A descricao deve ser informada',
      minlength: 'A descricao deve coter ao menos 10 caracteres',
      maxlength: 'A descricao deve conter no máximo 200 caracteres'
    },
    genero: {
      required: 'O genero deve ser informado.'
    },
    faixaEtaria: {
      required: 'A faixa etaria deve ser informada'
    }
  }

  getErrorMessage(controlName : string, errors: ValidationErrors | null | undefined): string {
    if (!errors){
      return '';
    }
    for (const errorName in errors) {
      if (errors.hasOwnProperty(errorName) && this.errorMessages[controlName][errorName]){
        return this.errorMessages[controlName][errorName];
      }
    }

    return 'invalid field';
  }
}
