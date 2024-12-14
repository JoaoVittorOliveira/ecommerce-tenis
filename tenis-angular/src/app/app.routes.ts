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
import { LoginSelectionComponent } from './components/login/login-selection/login-selection.component';
import { LoginSelectionGuard } from './guards/login-selection.guard';

import { CarrinhoComponent } from './components/carrinho/carrinho.component';

import { authGuard } from './guards/auth.guard';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { clientSectionGuard } from './guards/client-section.guard';
import { ClienteMyAccountComponent } from './components/cliente/cliente-my-account/cliente-my-account.component';

import { CadastroClienteComponent } from './components/cadastro-cliente/cadastro-cliente.component';



export const routes: Routes = [

    { path: 'minha-conta', component: ClienteMyAccountComponent, title: 'Minha Conta'},

    { path: 'login-selection', component: LoginSelectionComponent, title: 'Seleção de Login' },
    { path: 'login', component: LoginComponent, canActivate: [LoginSelectionGuard], title: 'Login' },
    { path: 'cadastro-cliente', component: CadastroClienteComponent, canActivate: [LoginSelectionGuard], title: 'Cadastro de Cliente' },
    
    { 
        path: 'admin', 
        component: AdminTemplateComponent, 
        title: 'e-commerce',
        canActivate: [authGuard],
        children: [
            {path: 'enderecos', component: EnderecoListComponent, title: 'Lista de Endereços',canActivate: [authGuard]},
            {path: 'enderecos/new',component: EnderecoFormComponent, title: 'Novo Endereço',canActivate: [authGuard]},
            {path: 'enderecos/edit/:id',component: EnderecoFormComponent, resolve: {endereco: enderecoResolver},canActivate: [authGuard]},
        
            {path: 'telefones', component: TelefoneListComponent, title: 'Lista de Telefones',canActivate: [authGuard]},
            {path: 'telefones/new',component: TelefoneFormComponent, title: 'Novo Telefone',canActivate: [authGuard]},
            {path: 'telefones/edit/:id',component: TelefoneFormComponent, resolve: {telefone: telefoneResolver},canActivate: [authGuard]},
        
            {path: 'cupons', component: CupomListComponent, title: 'Lista de Cupons de Desconto',canActivate: [authGuard]},
            {path: 'cupons/new',component: CupomFormComponent, title: 'Novo Cupom de Desconto',canActivate: [authGuard]},
            {path: 'cupons/edit/:id',component: CupomFormComponent, resolve: {cupom: cupomResolver},canActivate: [authGuard]},
        
        
            {path: 'cores', component: CorListComponent, title: 'Lista de Cores',canActivate: [authGuard]},
            {path: 'cores/new',component: CorFormComponent, title: 'Nova Cor',canActivate: [authGuard]},
            {path: 'cores/edit/:id',component: CorFormComponent, resolve: {cor: corResolver},canActivate: [authGuard]},
        
            {path: 'tamanhos', component: TamanhoListComponent, title: 'Lista de Tamanhos de Tenis',canActivate: [authGuard]},
            {path: 'tamanhos/new',component: TamanhoFormComponent, title: 'Novo Tamanho de Tenis',canActivate: [authGuard]},
            {path: 'tamanhos/edit/:id',component: TamanhoFormComponent, resolve: {tamanho: tamanhoResolver},canActivate: [authGuard]},
        
            {path: 'materiais', component: MaterialListComponent, title: 'Lista de Materiais',canActivate: [authGuard]},
            {path: 'materiais/new',component: MaterialFormComponent, title: 'Novo Material',canActivate: [authGuard]},
            {path: 'materiais/edit/:id',component: MaterialFormComponent, resolve: {material: materialResolver},canActivate: [authGuard]},
        
            {path: 'marcas', component: MarcaListComponent, title: 'Lista de Marcas',canActivate: [authGuard]},
            {path: 'marcas/new',component: MarcaFormComponent, title: 'Nova Marca',canActivate: [authGuard]},
            {path: 'marcas/edit/:id',component: MarcaFormComponent, resolve: {marca: marcaResolver},canActivate: [authGuard]},
            
            {path: 'categorias', component: CategoriaListComponent, title: 'Lista de Categorias',canActivate: [authGuard]},
            {path: 'categorias/new',component: CategoriaFormComponent, title: 'Nova Categoria',canActivate: [authGuard]},
            {path: 'categorias/edit/:id',component: CategoriaFormComponent, resolve: {categoria: categoriaResolver},canActivate: [authGuard]},
        
            {path: 'tenis', component: TenisListComponent, title: 'Lista de Tênis',canActivate: [authGuard]},
            {path: 'tenis/new',component: TenisFormComponent, title: 'Nova Tênis',canActivate: [authGuard]},
            {path: 'tenis/edit/:id',component: TenisFormComponent, resolve: {tenis: tenisResolver},canActivate: [authGuard]},
        
            {path: 'funcionarios', component: FuncionarioListComponent, title: 'Lista de Funcionarios',canActivate: [authGuard]},
            {path: 'funcionarios/new',component: FuncionarioFormComponent, title: 'Novo Funcionario',canActivate: [authGuard]},
            {path: 'funcionarios/edit/:id',component: FuncionarioFormComponent, resolve: {funcionario: funcionarioResolver},canActivate: [authGuard]},
        
            {path: 'clientes', component: ClienteListComponent, title: 'Lista de Clientes',canActivate: [authGuard]},
            {path: 'clientes/new',component: ClienteFormComponent, title: 'Novo Cliente',canActivate: [authGuard]},
            {path: 'clientes/edit/:id',component: ClienteFormComponent, resolve: {cliente: clienteResolver},canActivate: [authGuard]},
        
            {path: '', component: IndexListComponent, title: 'Gerenciamento',canActivate: [authGuard]},
        ]
    },
    { 
        path: '', 
        component: UserTemplateComponent, 
        title: 'e-commerce',
        canActivate: [clientSectionGuard],
        children: [
            {path: '', pathMatch: 'full', redirectTo: 'ecommerce'},
        
            { path: 'ecommerce', component: TenisCardListComponent, title: 'Passo Certo'},

            { path: 'detalhes/:id', component: DetalhesTenisComponent, title: 'Passo Certo - Detalhes' },

            //{ path: 'ecommerce/tenis/:id', component: DetalhesTenisComponent, title: 'Detalhes do tenis'}

            { path: 'carrinho', component: CarrinhoComponent, title: 'Passo Certo - Carrinho' },
        ]
    },
    { path: 'not-authorized', component: NotAuthorizedComponent, title: 'Não Autorizado' },

    // Página de "Page Not Found"
    { path: '**', component: NotFoundComponent, title: 'Página Não Encontrada' }
];

