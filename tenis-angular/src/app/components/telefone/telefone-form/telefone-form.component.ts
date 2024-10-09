import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TelefoneService } from '../../../services/telefone.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Telefone } from '../../../models/telefone.model';

@Component({
  selector: 'app-telefone-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, NgIf, MatInputModule, MatCardModule, MatToolbarModule],
  templateUrl: './telefone-form.component.html',
  styleUrl: './telefone-form.component.css'
})
export class TelefoneFormComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private telefoneService: TelefoneService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    const telefone: Telefone = this.activatedRoute.snapshot.data['telefone'];

    this.formGroup = this.formBuilder.group({
      id: [(telefone && telefone.id) ? telefone.id : null],
      
      ddd: [
        (telefone && telefone.ddd) ? telefone.ddd : '', [Validators.required, Validators.maxLength(2), Validators.minLength(2)]
      ],
      
      numero: [
        (telefone && telefone.numero) ? telefone.numero : '', Validators.required
      ]
    });

  }
  salvar() {
    if (this.formGroup.valid) {
      const telefone = this.formGroup.value;
      if (telefone.id == null) {
        this.telefoneService.insert(telefone).subscribe({
          next: (telefoneCadastrado) => {
            this.router.navigateByUrl('/telefones');
          },
          error: (errorResponse) => {
            console.log('Erro ao salvar', + JSON.stringify(errorResponse));
          }
        });
      } else {
        this.telefoneService.update(telefone).subscribe({
          next: (telefoneAlterado) => {
            this.router.navigateByUrl('/telefones');
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
      const telefone = this.formGroup.value;
      if (telefone.id != null) {
        if (confirm("Confirma a exclusão PERMANENTE de telefone?")) {
          this.telefoneService.delete(telefone).subscribe({
            next: () => {
              this.router.navigateByUrl('/telefones');
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
    this.router.navigateByUrl('/telefones');
  }
}