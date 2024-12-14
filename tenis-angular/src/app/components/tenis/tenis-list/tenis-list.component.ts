import { Component } from '@angular/core';
import { Tenis } from '../../../models/tenis.model';
import { TenisService } from '../../../services/tenis.service';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog-component';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { MatFormField, MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../../models/categoria.model';
import { Cor } from '../../../models/cor.model';
import { Marca } from '../../../models/marca.model';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from '../../../services/paginator.service';
import { DeleteDialog } from '../../delete-dialog/delete-dialog.component';
import { DeleteDialogError } from '../../delete-dialog-error/delete-dialog-error.component';

@Component({
  selector: 'app-tenis-list',
  standalone: true,
  imports: [NgIf,
            CommonModule,
            FormsModule,
            MatInputModule,
            MatFormField,
            MatToolbarModule,
            MatIconModule,
            MatButtonModule,
            MatTableModule,
            RouterModule,
            MatCheckboxModule,
            MatSelectModule,
            CommonModule,
            MatPaginator],
  templateUrl: './tenis-list.component.html',
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }
  ],
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


  constructor(private tenisService: TenisService, private dialog: MatDialog,  private router: Router){

  }
  

  ngOnInit(): void {
    this.tenisService.findAll().subscribe(
      data => { 
        //console.log(data); 
        this.tenisList = data;
        this.filteredTenis = data;
        this.totalRecords = data.length;
        this.populateFilterLists(data);

        let allColors: Cor[] = this.tenisList.map(tenis => tenis.cor);

        this.uniqueColors = [...new Set(allColors)];
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = filterValue.trim().toLowerCase();
    this.filteredTenis = this.tenisList.filter(cor =>
      cor.nome.toLowerCase().includes(this.filterValue) ||
      cor.quantidade.toString().includes(this.filterValue) ||
      cor.peso.toString().toLowerCase().includes(this.filterValue) ||
      cor.precoCompra.toString().toLowerCase().includes(this.filterValue) ||
      cor.precoVenda.toString().toLowerCase().includes(this.filterValue)

    );
    this.totalRecords = this.filteredTenis.length; 
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
  }

  
   populateFilterLists(data: Tenis[]): void {
    
    this.categorias = Array.from(new Set(data.map(tenis => tenis.categoria.nome)))
        .map(nome => {
            const categoriaEncontrada = data.find(tenis => tenis.categoria.nome === nome)?.categoria;
            return {
                id: categoriaEncontrada?.id,
                nome: nome,
                descricao: categoriaEncontrada?.descricao,
                genero: categoriaEncontrada?.genero,
                faixaEtaria: categoriaEncontrada?.faixaEtaria
            } as Categoria;
        });  
    
    
    const uniqueColorNames = Array.from(new Set(data.map(tenis => tenis.cor.nome)));
    this.cores = uniqueColorNames.map(nome => {
        const corEncontrada = data.find(tenis => tenis.cor.nome === nome)?.cor;
        return {
            id: corEncontrada?.id, 
            nome: nome,
            codigoHex: corEncontrada?.codigoHex 
        } as Cor; 
    });

    this.marcas = Array.from(new Set(data.map(tenis => JSON.stringify(tenis.marca))))
        .map(marcaJson => JSON.parse(marcaJson) as Marca); 
  }

  applyFilters(): void {
    this.filteredTenis = this.tenisList.filter(tenis => {
      return (
        (!this.selectedCategoria || tenis.categoria.nome === this.selectedCategoria) &&
        (!this.selectedCor || tenis.cor.nome === this.selectedCor) &&
        (!this.selectedMarca || tenis.marca.nome === this.selectedMarca)
      );
    });
  }

  resetFilters(): void {
    this.selectedCategoria = '';
    this.selectedCor = '';
    this.selectedMarca = '';
    this.filteredTenis = this.tenisList;
  }


  excluir(tenis: Tenis): void {
    const dialogRef = this.dialog.open(DeleteDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tenisService.delete(tenis).subscribe({
          next: () => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/admin/tenis']); // Navega de volta para a lista
            });          },
            error: (err) => {
              console.error('Erro ao tentar excluir o telefone', err);
              this.erroExcluir();
            }
          });
        }
      });
    }
  
    erroExcluir():void{
      const dialogError = this.dialog.open(DeleteDialogError, {
        data: { message: 'Erro ao tentar excluir o telefone. Por favor, tente novamente.' },
      });
      
      dialogError.afterClosed().subscribe(result => {
        // Aqui você pode lidar com o fechamento do diálogo, se necessário.
      });
    }

    paginar(event: PageEvent): void {
      this.page = event.pageIndex;
      this.pageSize = event.pageSize;
      
      if (this.filterValue) {
        this.applyCurrentFilter(); // Reaplica o filtro para a nova página
      } else {
        this.loadData(); // Recarrega os dados sem filtro
      }
    }

    
  loadData(): void{
    this.tenisService.findAll(this.page, this.pageSize).subscribe((data) => {
      this.tenisList = data
      this.applyCurrentFilter();      
    });

    this.tenisService.count().subscribe((count) => {
      this.totalRecords = count;
    });
  }

    applyCurrentFilter(): void {
  
      const normalizedFilter = this.filterValue.trim().toLowerCase();
  
      const filtered = this.tenisList.filter(
        (tenis) =>
          tenis.toString().toLowerCase().includes(normalizedFilter)
      );
  
      this.filteredTenis = filtered.slice(
        this.page * this.pageSize,
        (this.page + 1) * this.pageSize
      );
  
      this.totalRecords = filtered.length;
    }
  
}
