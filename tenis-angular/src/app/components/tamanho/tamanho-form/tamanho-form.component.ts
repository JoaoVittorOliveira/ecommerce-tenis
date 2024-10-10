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
import { Tamanho } from '../../../models/tamanho.model';
import { TamanhoService } from '../../../services/tamanho.service';

@Component({
  selector: 'app-tamanho-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, 
    RouterModule, MatSelectModule, MatSliderModule],
  templateUrl: './tamanho-form.component.html',
  styleUrl: './tamanho-form.component.css'
})
export class TamanhoFormComponent {

  formGroup: FormGroup;
  tamanhos: Tamanho[] = [];

  constructor(private formBuilder: FormBuilder,
    private tamanhoService: TamanhoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.formGroup = this.formBuilder.group({
      id: [null],
      numeracao: ['', Validators.required],
      tamanhoEmCm: ['', Validators.required],
      pais: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.tamanhoService.findAll().subscribe(data=> {
      this.tamanhos = data;
      this.initializeForm();
    })
  }

  initializeForm(): void {
    
    const tamanho: Tamanho = this.activatedRoute.snapshot.data['tamanho'];
    
    this.formGroup = this.formBuilder.group({
      id: [
        (tamanho && tamanho.id) ? tamanho.id : null
      ],
      numeracao: [
        (tamanho && tamanho.numeracao) ? tamanho.numeracao : null, 
        Validators.compose([Validators.required, Validators.min(30),Validators.max(60)])
      ],
      tamanhoEmCm: [
        (tamanho && tamanho.tamanhoEmCm) ? tamanho.tamanhoEmCm : null, 
        Validators.compose([Validators.required, Validators.minLength(0),Validators.maxLength(3)])
      ],
      pais: [
        (tamanho && tamanho.pais) ? tamanho.pais : null,
        Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(2)])
      ]
    })

  }

  salvar() {

    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const tamanho = this.formGroup.value;

      // NOVO CADASTRO
      if (tamanho.id ==null) {
        this.tamanhoService.insert(tamanho).subscribe({
          next: (tamanhoCadastrado) => {
            this.router.navigateByUrl('/tamanhos');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } 
      // ATUALIZAR CADASTRO
      else {
        this.tamanhoService.update(tamanho).subscribe({
          next: (tamanhoAlterado) => {
            this.router.navigateByUrl('/tamanhos');
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
      const tamanho = this.formGroup.value;
      if (tamanho.id != null) {

        if (confirm(`Confirma a EXCLUSÃO PERMANENTE da tamanho: ${tamanho.numeracao} - ${tamanho.tamanhoEmCm} - ${tamanho.pais} ?`)){
          this.tamanhoService.delete(tamanho).subscribe({
            next: () => {
              this.router.navigateByUrl('/tamanhos');
            },
            error: (err) => {
              console.log('Erro ao Excluir' + JSON.stringify(err));
            }
          });
        }
      }
    }
  }

}
