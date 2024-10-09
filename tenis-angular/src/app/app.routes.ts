import { Routes } from '@angular/router';
import { EnderecoListComponent } from './components/endereco/endereco-list/endereco-list.component';
import { EnderecoFormComponent } from './components/endereco/endereco-form/endereco-form.component';
import { enderecoResolver } from './components/endereco/resolver';
import { TelefoneListComponent } from './components/telefone/telefone-list/telefone-list.component';
import { TelefoneFormComponent } from './components/telefone/telefone-form/telefone-form.component';
import { telefoneResolver } from './components/telefone/resolver';
import { CorListComponent } from './components/cor/cor-list/cor-list.component';
import { CorFormComponent } from './components/cor/cor-form/cor-form.component';
import { corResolver } from './components/cor/resolver';

export const routes: Routes = [
    {path: 'enderecos', component: EnderecoListComponent, title: 'Lista de Endereços'},
    {path: 'enderecos/new',component: EnderecoFormComponent, title: 'Novo Endereço'},
    {path: 'enderecos/edit/:id',component: EnderecoFormComponent, resolve: {endereco: enderecoResolver}},

    {path: 'telefones', component: TelefoneListComponent, title: 'Lista de Telefones'},
    {path: 'telefones/new',component: TelefoneFormComponent, title: 'Novo Telefone'},
    {path: 'telefones/edit/:id',component: TelefoneFormComponent, resolve: {telefone: telefoneResolver}},
   
    {path: 'cores', component: CorListComponent, title: 'Lista de Endereços'},
    {path: 'cores/new',component: CorFormComponent, title: 'Novo Endereço'},
    {path: 'cores/edit/:id',component: CorFormComponent, resolve: {cor: corResolver}},
];
