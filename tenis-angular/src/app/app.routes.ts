import { Routes } from '@angular/router';
import { EnderecoListComponent } from './components/endereco/endereco-list/endereco-list.component';
import { EnderecoFormComponent } from './components/endereco/endereco-form/endereco-form.component';
import { enderecoResolver } from './components/endereco/resolver';

export const routes: Routes = [
    {path: 'enderecos', component: EnderecoListComponent, title: 'Lista de Endereços'},
    {path: 'enderecos/new',component: EnderecoFormComponent, title: 'Novo Endereço'},
    {path: 'enderecos/edit/:id',component: EnderecoFormComponent, resolve: {endereco: enderecoResolver}}
];
