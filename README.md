# E-commerce de Tênis

Um e-commerce para venda de tênis, desenvolvido com **Quarkus** no backend e **Angular V18** no frontend.

## Descrição

Este projeto é um sistema de e-commerce especializado em tênis, permitindo que clientes possam navegar por diversas categorias, adicionar produtos ao carrinho, realizar compras e acompanhar o status dos pedidos. A administração da loja permite que funcionários cadastrem novos produtos e gerenciem as vendas.

## Tecnologias Utilizadas

- **Backend**: Quarkus, JPA, Hibernate
- **Frontend**: Angular V18, TypeScript
- **Banco de Dados**: PostgreSQL
- **Outras**: Docker (opcional para containerização)

## Instalação

### Clonando o repositório

```bash
git clone https://github.com/seu-repositorio/nome-do-projeto.git

## Backend (Quarkus)
Acesse a pasta do projeto backend:

```bash
cd backend

### Execute o Quarkus:
```bash
./mvnw quarkus:dev

Frontend (Angular)

### Acesse a pasta do projeto frontend:

```bash
cd frontend

### Instale as dependências:

```bash
npm install

### Execute o Angular:

```bash
ng serve

## Banco de Dados (PostgreSQL)

### Configure o banco de dados conforme o arquivo de configuração application.properties.

### Execute o banco de dados localmente.

## Funcionalidades

### Cadastro de Produtos: Administre o catálogo de tênis, adicionando, editando e removendo produtos.

### Gerenciamento de Usuários: Controle os usuários do sistema, incluindo clientes e funcionários.

### Carrinho de Compras: Permita que os usuários adicionem produtos ao carrinho e realizem compras.

### Registro de Vendas: Acompanhe e administre o histórico de vendas da loja.

## Como Usar

### Para navegar como cliente, acesse o frontend e explore as opções de tênis disponíveis.

### Para administrar a loja, faça login como funcionário e acesse o painel de administração para gerenciar produtos e vendas.

## Contribuição

### Contribuições são bem-vindas! Siga os passos abaixo para contribuir:

### Faça um fork do projeto.

### Crie uma branch com a nova funcionalidade:

```bash
git checkout -b minha-nova-feature

### Faça commit das suas mudanças:

```bash
git commit -m 'Adiciona nova feature'

Envie as mudanças para o repositório remoto:

```bash
git push origin minha-nova-feature

### Abra um Pull Request.

## Autores
### Nome 1 - @githubuser
### Nome 2 - @githubuser