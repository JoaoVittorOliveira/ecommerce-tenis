import { Component } from '@angular/core';

// Component-imports
import {MatSelectModule} from '@angular/material/select';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Marca } from '../../../models/marca.model';
import { TenisService } from '../../../services/tenis.service';
import { MarcaService } from '../../../services/marca.service';
import { MaterialService } from '../../../services/material.service';
import { CorService } from '../../../services/cor.service';
import { CategoriaService } from '../../../services/categoria.service';
import { TamanhoService } from '../../../services/tamanho.service';
import { Tenis } from '../../../models/tenis.model';
import { Material } from '../../../models/material.model';
import { Cor } from '../../../models/cor.model';
import { Categoria } from '../../../models/categoria.model';
import { Tamanho } from '../../../models/tamanho.model';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog-component';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-tenis-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, RouterModule, MatSelectModule, MatIcon],
  templateUrl: './tenis-form.component.html',
  styleUrl: './tenis-form.component.css'
})
export class TenisFormComponent {

  formGroup: FormGroup;
  marcas: Marca[] = [];
  materiais: Material[] = [];
  cores: Cor[] = [];
  categorias: Categoria[] = [];
  tamanhos: Tamanho[] = [];

  constructor(private formBuilder: FormBuilder,
    private tenisService: TenisService,
    private marcaService: MarcaService,
    private materialService: MaterialService,
    private corService: CorService,
    private categoriaService: CategoriaService,
    private tamanhoService: TamanhoService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute) {
    this.formGroup = this.formBuilder.group({
      id: [null],
      nome: ['', Validators.required],
      quantidade: ['', Validators.required],
      peso: ['', Validators.required],
      precoCompra: ['', Validators.required],
      precoVenda: ['', Validators.required],
      marca: [null],
      material: [null],
      cor: [null],
      categoria: [null],
      tamanho: [null]
    })
  }

  ngOnInit(): void {
    
    // forkJoin: usado para sincronizar os dados antes de iniciar o formulario
    // usado para garantir que vai puxar todos os relacionamentos antes de iniciar
    forkJoin({
      marcas: this.marcaService.findAll(),
      materiais: this.materialService.findAll(),
      cores: this.corService.findAll(),
      categorias: this.categoriaService.findAll(),
      tamanhos: this.tamanhoService.findAll()
    }).subscribe((response) => {
      this.marcas = response.marcas;
      this.materiais = response.materiais;
      this.cores = response.cores;
      this.categorias = response.categorias;
      this.tamanhos = response.tamanhos;
      this.initializeForm();
    });
  }

  initializeForm(): void {

    const tenis: Tenis = this.activatedRoute.snapshot.data['tenis'];
    
    const marca = this.marcas.find(marca => marca.id === (tenis?.marca?.id || null));
    const material = this.materiais.find(material => material.id === (tenis?.material?.id || null));
    const cor = this.cores.find(cor => cor.id === (tenis?.cor?.id || null));
    const categoria = this.categorias.find(categoria => categoria.id === (tenis?.categoria?.id || null));
    const tamanho = this.tamanhos.find(tamanho => tamanho.id === (tenis?.tamanho?.id || null));
    
    this.formGroup = this.formBuilder.group({
      id: [(tenis && tenis.id) ? tenis.id : null],
      nome: [(tenis && tenis.nome) ? tenis.nome : null, 
              Validators.compose([Validators.required, Validators.minLength(2),Validators.maxLength(40)])],

      quantidade: [(tenis && tenis.quantidade) ? tenis.quantidade : null, 
              Validators.compose([Validators.required, Validators.min(1)])],  

      peso: [(tenis && tenis.peso) ? tenis.peso : null, 
              Validators.compose([Validators.required, Validators.min(0)])],

      precoCompra: [(tenis && tenis.precoCompra) ? tenis.precoCompra : null, 
                Validators.compose([Validators.required, Validators.min(0)])],

      precoVenda: [(tenis && tenis.precoVenda) ? tenis.precoVenda : null, 
                Validators.compose([Validators.required, Validators.min(0)])],

      marca: [marca, Validators.compose([Validators.required])],
      material: [material, Validators.compose([Validators.required])],
      cor: [cor, Validators.compose([Validators.required])],
      categoria: [categoria, Validators.compose([Validators.required])],
      tamanho: [tamanho, Validators.compose([Validators.required])]

    })

  }

  salvar() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const tenis = this.formGroup.value;
      if (tenis.id ==null) {
        this.tenisService.insert(tenis).subscribe({
          next: (tenisCadastrado) => {
            this.router.navigateByUrl('/tenis');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.tenisService.update(tenis).subscribe({
          next: (tenisAlterado) => {
            this.router.navigateByUrl('/tenis');
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
      const tenis = this.formGroup.value;
      if (tenis.id != null) {

        const dialogRef = this.dialog.open(ConfirmDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.tenisService.delete(tenis).subscribe({
              next: () => {
                this.router.navigateByUrl('/tenis');
              },
              error: (err) => {
                console.error('Erro ao tentar excluir o tenis', err);
              }
            });
          }
        });

      }
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

  errorMessages: {[controlName: string]: {[errorName: string]: string}} = {
    nome : {
      required: 'O nome deve ser informado.',
      minlength: 'O nome deve conter ao menos 2 letras.',
      maxlength: 'O nome deve conter no máximo 40 letras.'
    },
    quantidade : {
      required: 'A quantidade deve ser informada.',
      min: 'O mínimo é 1 unidade.',
    },
    peso : {
      required: 'O peso deve ser informado.',
      min: 'O mínimo é 1g.',
    }
  }
}
