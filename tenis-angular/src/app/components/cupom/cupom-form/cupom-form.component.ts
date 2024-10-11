import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {MatSliderModule} from '@angular/material/slider';
import { Cupom } from '../../../models/cupom.model';
import { CupomService } from '../../../services/cupom.service';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog-component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cupom-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, 
    RouterModule, MatSelectModule, MatSliderModule],
  templateUrl: './cupom-form.component.html',
  styleUrl: './cupom-form.component.css'
})
export class CupomFormComponent {

  formGroup: FormGroup;
  cupons: Cupom[] = [];

  constructor(private formBuilder: FormBuilder,
    private cupomService: CupomService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog) {
      this.formGroup = this.formBuilder.group({
        id: [null],
        codigo: ['', Validators.required],
        porcentagemDesconto: ['', Validators.required],
        valorDesconto: ['', Validators.required]
      })
  }

  ngOnInit(): void {
    this.cupomService.findAll().subscribe(data=> {
      this.cupons = data;
      this.initializeForm();
    })
  }

  initializeForm(): void {
    
    const cupom: Cupom = this.activatedRoute.snapshot.data['cupom'];
    
    this.formGroup = this.formBuilder.group({
      id: [
        (cupom && cupom.id) ? cupom.id : null
      ],
      codigo: [
        (cupom && cupom.codigo) ? cupom.codigo : null, 
        Validators.compose([Validators.required, Validators.minLength(5),Validators.maxLength(5)])
      ],
      porcentagemDesconto: [
        (cupom && cupom.porcentagemDesconto !== null && cupom.porcentagemDesconto !== undefined) ? cupom.porcentagemDesconto : 0, 
        Validators.compose([Validators.required, Validators.min(0),Validators.max(30)])
      ],
      valorDesconto: [
        (cupom && cupom.valorDesconto !== null && cupom.valorDesconto !== undefined) ? cupom.valorDesconto : 0,
        Validators.compose([Validators.required, Validators.min(0), Validators.max(1000)])
      ]
    })

  }

  salvar() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const cupom = this.formGroup.value;

      // NOVO CADASTRO
      if (cupom.id ==null) {
        this.cupomService.insert(cupom).subscribe({
          next: (cupomCadastrado) => {
            this.router.navigateByUrl('/cupons');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } 
      // ATUALIZAR CADASTRO
      else {
        this.cupomService.update(cupom).subscribe({
          next: (cupomAlterado) => {
            this.router.navigateByUrl('/cupons');
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
      const cupom = this.formGroup.value;
      if (cupom.id != null) {

        const dialogRef = this.dialog.open(ConfirmDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.cupomService.delete(cupom).subscribe({
              next: () => {
                this.router.navigateByUrl('/cupons');
              },
              error: (err) => {
                console.error('Erro ao tentar excluir o cupom', err);
              }
            });
          }
        });

      }
    }
  }

}
