import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { Material } from '../../../models/material.model';
import { MaterialService } from '../../../services/material.service';

@Component({
  selector: 'app-material-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, NgIf, MatInputModule, MatCardModule, MatToolbarModule],
  templateUrl: './material-form.component.html',
  styleUrl: './material-form.component.css'
})
export class MaterialFormComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private materialService: MaterialService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    const material: Material = this.activatedRoute.snapshot.data['material'];

    this.formGroup = this.formBuilder.group({
      id: [(material && material.id) ? material.id : null],
      
      descricao: [
        (material && material.descricao) ? material.descricao : '', Validators.required],
      
      categoria: [
        (material && material.categoria) ? material.categoria : '', Validators.required
      ]
    });

  }
  salvar() {
    if (this.formGroup.valid) {
      const material = this.formGroup.value;
      if (material.id == null) {
        this.materialService.insert(material).subscribe({
          next: (materialCadastrado) => {
            this.router.navigateByUrl('/materiais');
          },
          error: (errorResponse) => {
            console.log('Erro ao salvar', + JSON.stringify(errorResponse));
          }
        });
      } else {
        this.materialService.update(material).subscribe({
          next: (materialAlterado) => {
            this.router.navigateByUrl('/materiais');
          },
          error: (err) => {
            console.log('Erro ao salvar', + JSON.stringify(err));
          }
        });
      }
    }
  }

  excluir() {
    if (this.formGroup.valid) {
      const material = this.formGroup.value;
      if (material.id != null) {
        if (confirm("Confirma a exclusão PERMANENTE de material?")) {
          this.materialService.delete(material).subscribe({
            next: () => {
              this.router.navigateByUrl('/materiais');
            },
            error: (err) => {
              console.log('Erro ao Excluir' + JSON.stringify(err));
            }
          });
        }
      }
    }
  }

  cancelar(){
    this.router.navigateByUrl('/materiais');
  }
}