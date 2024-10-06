
# E-commerce de Tênis (Trabalho de Tópicos em Programação 2 - UNIVERSIDADE ESTADUAL DO TOCANTINS)

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

1. Clone o repositório:
   - `git clone https://github.com/seu-repositorio/nome-do-projeto.git`

### Backend (Quarkus)

1. Acesse a pasta do projeto backend:
   - `cd backend`

2. Execute o Quarkus:
   - `./mvnw quarkus:dev`

### Frontend (Angular)

1. Acesse a pasta do projeto frontend:
   - `cd frontend`

2. Instale as dependências:
   - `npm install`

3. Execute o Angular:
   - `ng serve`

### Banco de Dados (PostgreSQL)

1. Configure o banco de dados conforme o arquivo de configuração `application.properties`.
2. Execute o banco de dados localmente.

## Funcionalidades

- **Cadastro de Produtos**: Administre o catálogo de tênis, adicionando, editando e removendo produtos.
- **Gerenciamento de Usuários**: Controle os usuários do sistema, incluindo clientes e funcionários.
- **Carrinho de Compras**: Permita que os usuários adicionem produtos ao carrinho e realizem compras.
- **Registro de Vendas**: Acompanhe e administre o histórico de vendas da loja.

## Como Usar

1. Para navegar como cliente, acesse o frontend e explore as opções de tênis disponíveis.
2. Para administrar a loja, faça login como funcionário e acesse o painel de administração para gerenciar produtos e vendas.

## Contribuição

Contribuições são bem-vindas! Siga os passos abaixo para contribuir:

1. Faça um fork do projeto.
2. Crie uma branch com a nova funcionalidade:
   - `git checkout -b minha-nova-feature`
3. Faça commit das suas mudanças:
   - `git commit -m 'Adiciona nova feature'`
4. Envie as mudanças para o repositório remoto:
   - `git push origin minha-nova-feature`
5. Abra um Pull Request.

## Autores

- Nome 1 - @githubuser
- Nome 2 - @githubuser
