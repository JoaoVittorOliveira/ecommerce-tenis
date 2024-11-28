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
import { CupomListComponent } from './components/cupom/cupom-list/cupom-list.component';
import { CupomFormComponent } from './components/cupom/cupom-form/cupom-form.component';
import { cupomResolver } from './components/cupom/resolver';
import { TamanhoListComponent } from './components/tamanho/tamanho-list/tamanho-list.component';
import { TamanhoFormComponent } from './components/tamanho/tamanho-form/tamanho-form.component';
import { tamanhoResolver } from './components/tamanho/resolver';

import { MaterialListComponent } from './components/material/material-list/material-list.component';
import { materialResolver } from './components/material/resolver';
import { MaterialFormComponent } from './components/material/material-form/material-form.component';
import { marcaResolver } from './components/marca/resolver';
import { MarcaListComponent } from './components/marca/marca-list/marca-list.component';
import { MarcaFormComponent } from './components/marca/marca-form/marca-form.component';
import { IndexListComponent } from './components/index/endereco-list/index-list.component';
import { categoriaResolver } from './components/categoria/resolver';
import { CategoriaListComponent } from './components/categoria/categoria-list/categoria-list.component';
import { CategoriaFormComponent } from './components/categoria/categoria-form/categoria-form.component';
import { TenisListComponent } from './components/tenis/tenis-list/tenis-list.component';
import { TenisFormComponent } from './components/tenis/tenis-form/tenis-form.component';
import { tenisResolver } from './components/tenis/resolver';
import { FuncionarioListComponent } from './components/funcionario/funcionario-list/funcionario-list.component';
import { FuncionarioFormComponent } from './components/funcionario/funcionario-form/funcionario-form.component';
import { funcionarioResolver } from './components/funcionario/resolver';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './components/cliente/cliente-form/cliente-form.component';
import { clienteResolver } from './components/cliente/resolver';
import { TenisCardListComponent } from './components/tenis/tenis-card-list/tenis-card-list.component';
import { AdminTemplateComponent } from './components/template/admin-template/admin-template.component';
import { UserTemplateComponent } from './components/template/user-template/user-template.component';
import { DetalhesTenisComponent } from './components/tenis/detalhes-tenis/detalhes-tenis.component';
import { LoginComponent } from './components/login/login.component';


export const routes: Routes = [
    {
        path: 'admin', 
        component: AdminTemplateComponent, 
        title: 'e-commerce',
        children: 
        [

            { path: 'login', component: LoginComponent, title: 'Login'},

            {path: 'enderecos', component: EnderecoListComponent, title: 'Lista de Endereços'},
            {path: 'enderecos/new',component: EnderecoFormComponent, title: 'Novo Endereço'},
            {path: 'enderecos/edit/:id',component: EnderecoFormComponent, resolve: {endereco: enderecoResolver}},
        
            {path: 'telefones', component: TelefoneListComponent, title: 'Lista de Telefones'},
            {path: 'telefones/new',component: TelefoneFormComponent, title: 'Novo Telefone'},
            {path: 'telefones/edit/:id',component: TelefoneFormComponent, resolve: {telefone: telefoneResolver}},
        
            {path: 'cupons', component: CupomListComponent, title: 'Lista de Cupons de Desconto'},
            {path: 'cupons/new',component: CupomFormComponent, title: 'Novo Cupom de Desconto'},
            {path: 'cupons/edit/:id',component: CupomFormComponent, resolve: {cupom: cupomResolver}},
        
        
            {path: 'cores', component: CorListComponent, title: 'Lista de Cores'},
            {path: 'cores/new',component: CorFormComponent, title: 'Nova Cor'},
            {path: 'cores/edit/:id',component: CorFormComponent, resolve: {cor: corResolver}},
        
            {path: 'tamanhos', component: TamanhoListComponent, title: 'Lista de Tamanhos de Tenis'},
            {path: 'tamanhos/new',component: TamanhoFormComponent, title: 'Novo Tamanho de Tenis'},
            {path: 'tamanhos/edit/:id',component: TamanhoFormComponent, resolve: {tamanho: tamanhoResolver}},
        
            {path: 'materiais', component: MaterialListComponent, title: 'Lista de Materiais'},
            {path: 'materiais/new',component: MaterialFormComponent, title: 'Novo Material'},
            {path: 'materiais/edit/:id',component: MaterialFormComponent, resolve: {material: materialResolver}},
        
            {path: 'marcas', component: MarcaListComponent, title: 'Lista de Marcas'},
            {path: 'marcas/new',component: MarcaFormComponent, title: 'Nova Marca'},
            {path: 'marcas/edit/:id',component: MarcaFormComponent, resolve: {marca: marcaResolver}},
            
            {path: 'categorias', component: CategoriaListComponent, title: 'Lista de Categorias'},
            {path: 'categorias/new',component: CategoriaFormComponent, title: 'Nova Categoria'},
            {path: 'categorias/edit/:id',component: CategoriaFormComponent, resolve: {categoria: categoriaResolver}},
        
            {path: 'tenis', component: TenisListComponent, title: 'Lista de Tênis'},
            {path: 'tenis/new',component: TenisFormComponent, title: 'Nova Tênis'},
            {path: 'tenis/edit/:id',component: TenisFormComponent, resolve: {tenis: tenisResolver}},
        
            {path: 'funcionarios', component: FuncionarioListComponent, title: 'Lista de Funcionarios'},
            {path: 'funcionarios/new',component: FuncionarioFormComponent, title: 'Novo Funcionario'},
            {path: 'funcionarios/edit/:id',component: FuncionarioFormComponent, resolve: {funcionario: funcionarioResolver}},
        
            {path: 'clientes', component: ClienteListComponent, title: 'Lista de Clientes'},
            {path: 'clientes/new',component: ClienteFormComponent, title: 'Novo Cliente'},
            {path: 'clientes/edit/:id',component: ClienteFormComponent, resolve: {cliente: clienteResolver}},
        
            {path: '', component: IndexListComponent, title: 'Gerenciamento'},
        
        ]
    },
    

    { 
        path: '', 
        component: UserTemplateComponent, 
        title: 'e-commerce',
        children: [
            {path: '', pathMatch: 'full', redirectTo: 'ecommerce'},
        
            { path: 'ecommerce', component: TenisCardListComponent, title: 'Lista de Cards de Tênis'},

            // fazer dialog de ver mais virar component separado
            //{ path: 'ecommerce/tenis/:id', component: DetalhesTenisComponent, title: 'Detalhes do tenis'}

        ]
    }

];
