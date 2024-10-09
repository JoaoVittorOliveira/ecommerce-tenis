import { Routes } from '@angular/router';
import { EnderecoListComponent } from './components/endereco/endereco-list/endereco-list.component';
import { EnderecoFormComponent } from './components/endereco/endereco-form/endereco-form.component';
import { enderecoResolver } from './components/endereco/resolver';
import { TelefoneListComponent } from './components/telefone/telefone-list/telefone-list.component';
import { TelefoneFormComponent } from './components/telefone/telefone-form/telefone-form.component';
import { telefoneResolver } from './components/telefone/resolver';
import { MaterialListComponent } from './components/material/material-list/material-list.component';
import { materialResolver } from './components/material/resolver';
import { MaterialFormComponent } from './components/material/material-form/material-form.component';

export const routes: Routes = [
    {path: 'enderecos', component: EnderecoListComponent, title: 'Lista de Endereços'},
    {path: 'enderecos/new',component: EnderecoFormComponent, title: 'Novo Endereço'},
    {path: 'enderecos/edit/:id',component: EnderecoFormComponent, resolve: {endereco: enderecoResolver}},

    {path: 'telefones', component: TelefoneListComponent, title: 'Lista de Telefones'},
    {path: 'telefones/new',component: TelefoneFormComponent, title: 'Novo Telefone'},
    {path: 'telefones/edit/:id',component: TelefoneFormComponent, resolve: {telefone: telefoneResolver}},

    {path: 'materiais', component: MaterialListComponent, title: 'Lista de Materiais'},
    {path: 'materiais/new',component: MaterialFormComponent, title: 'Novo Material'},
    {path: 'materiais/edit/:id',component: MaterialListComponent, resolve: {material: materialResolver}}
];
