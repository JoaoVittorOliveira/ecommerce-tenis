import { Component } from '@angular/core';
import { Tenis } from '../../../models/tenis.model';
import { TenisService } from '../../../services/tenis.service';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog-component';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { MatFormField, MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../../models/categoria.model';
import { Cor } from '../../../models/cor.model';
import { Marca } from '../../../models/marca.model';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-tenis-list',
  standalone: true,
  imports: [NgIf,CommonModule,FormsModule,MatInputModule,MatFormField,MatToolbarModule, MatIconModule, MatButtonModule, MatTableModule, RouterModule, MatCheckboxModule, MatSelectModule],
  templateUrl: './tenis-list.component.html',
  styleUrl: './tenis-list.component.css'
})
export class TenisListComponent {

  displayedColumns: string[] = ['id','nome','quantidade','peso', 'precoCompra', 'precoVenda', 'marca', 'material', 'cor', 'categoria', 'tamanho','acao'];
  tenisList: Tenis[]=[];
  filteredTenis: Tenis[] = [];

  // Armazenar listas de categorias, marcas e cores
  categorias: Categoria[] = [];
  cores: Cor[] = [];
  marcas: Marca[] = [];

  selectedCategoria: string = '';
  selectedCor: string = '';
  selectedMarca: string = '';
  uniqueColors: Cor[] = [];

  totalRecords = 0;
  pageSize = 5;
  page = 0;
  showSearch = false;
  filterValue = '';


  constructor(private tenisService: TenisService, private dialog: MatDialog){

  }
  

  ngOnInit(): void {
    this.tenisService.findAll().subscribe(
      data => { 
        console.log(data); 
        this.tenisList = data;
        this.filteredTenis = data;
        this.totalRecords = data.length;
        this.populateFilterLists(data);
        
        // Supondo que você tenha um array `tenisList` que contém a lista de tênis
        let allColors = this.tenisList.map(tenis => tenis.cor);

        // Usar Set para remover duplicados
        this.uniqueColors = [...new Set(allColors)];
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = filterValue.trim().toLowerCase();  // Remove espaços e converte para lowercase
    this.filteredTenis = this.tenisList.filter(cor =>
      cor.nome.toLowerCase().includes(this.filterValue) ||
      cor.quantidade.toString().includes(this.filterValue) ||
      cor.peso.toString().toLowerCase().includes(this.filterValue) ||
      cor.precoCompra.toString().toLowerCase().includes(this.filterValue) ||
      cor.precoVenda.toString().toLowerCase().includes(this.filterValue)

    );
    this.totalRecords = this.filteredTenis.length;  // Atualiza o número total de registros
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
  }

  
   populateFilterLists(data: Tenis[]): void {
    
    // Para categorias únicas, mantendo a estrutura completa da categoria
    this.categorias = Array.from(new Set(data.map(tenis => JSON.stringify(tenis.categoria))))
        .map(categoriaJson => JSON.parse(categoriaJson) as Categoria); // Fazendo um cast para Categoria   
    
    
    const uniqueColorNames = Array.from(new Set(data.map(tenis => tenis.cor.nome)));
    this.cores = uniqueColorNames.map(nome => {
        const corEncontrada = data.find(tenis => tenis.cor.nome === nome)?.cor;
        return {
            id: corEncontrada?.id, 
            nome: nome,
            codigoHex: corEncontrada?.codigoHex 
        } as Cor; 
    });

    // Para marcas únicas, mantendo a estrutura completa da marca
    this.marcas = Array.from(new Set(data.map(tenis => JSON.stringify(tenis.marca))))
        .map(marcaJson => JSON.parse(marcaJson) as Marca); // Fazendo um cast para Marca
  }

  // Função para aplicar os filtros com base nos valores selecionados
  applyFilters(): void {
    this.filteredTenis = this.tenisList.filter(tenis => {
      return (
        (!this.selectedCategoria || tenis.categoria.nome === this.selectedCategoria) &&
        (!this.selectedCor || tenis.cor.nome === this.selectedCor) &&
        (!this.selectedMarca || tenis.marca.nome === this.selectedMarca)
      );
    });
  }

  // Função para resetar os filtros
  resetFilters(): void {
    this.selectedCategoria = '';
    this.selectedCor = '';
    this.selectedMarca = '';
    this.filteredTenis = this.tenisList;
  }


  excluir(tenis: Tenis): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tenisService.delete(tenis).subscribe({
          next: () => {
            this.tenisList = this.tenisList.filter(e => e.id !== tenis.id);
          },
          error: (err) => {
            console.error('Erro ao tentar excluir o tenis', err);
          }
        });
      }
    });
  }
}
