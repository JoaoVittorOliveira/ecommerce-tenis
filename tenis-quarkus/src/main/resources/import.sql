insert into marca(nome,logo) 
values 
('nike', 'https://upload.wikimedia.org/wikipedia/commons/3/36/Logo_nike_principal.jpg'), 
('adidas', 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg');

insert into tamanho(numeracao, tamanho_em_cm, pais, data_cadastro) 
values 
(37, '25', 'BR', CURRENT_DATE),
(38, '25,5', 'BR', CURRENT_DATE),
(39, '26', 'BR', CURRENT_DATE),
(40, '26,5', 'BR', CURRENT_DATE),
(41, '27', 'BR', CURRENT_DATE),
(42, '27,5', 'BR', CURRENT_DATE),
(43, '28', 'BR', CURRENT_DATE);

insert into cor(nome, codigo_hex, data_cadastro)
values
('preto', 'FFFFFFF', CURRENT_DATE),
('branco', '0000000', CURRENT_DATE);

insert into cupom(codigo, porcentagem_desconto, valor_desconto, data_cadastro)
values
('DEZ10', 10, 0, CURRENT_DATE),
('20VIN', 0, 20, CURRENT_DATE);

insert into endereco(id,cep,rua,complemento) values (2,'111','rua 1','em frente a rua 2');

insert into telefone(id,ddd,numero,data_cadastro) 
values 
(1, 99, 999999999, CURRENT_DATE),
(2, 11, 111111111, CURRENT_DATE);

insert into material(id,descricao,categoria,data_cadastro) 
values 
(1, 'couro', 'sintético', CURRENT_DATE),
(2, 'tecido', 'natural', CURRENT_DATE),
(3, 'jeans', 'natural', CURRENT_DATE);


insert into categoria (id, nome, descricao, genero, faixa_etaria)
values
(1, 'Casual', 'Para tênis casuais', 'Unissex', 'Adulto'),
(2, 'Casual', 'Para tênis casuais', 'Unissex', 'Infantil'),
(3, 'Esportivo', 'Para tênis esportivos', 'Masculino', 'Adulto'),
(4, 'Esportivo', 'Para tênis esportivos', 'Feminino', 'Adulto'),
(5, 'Social', 'Para tênis sociais', 'Masculino', 'Adulto'),
(6, 'Social', 'Para tênis sociais', 'Feminino', 'Adulto'),
(7, 'Social', 'Para tênis sociais', 'Masculino', 'Infantil');


-- ADICIONANDO CLIENTE
insert into usuario (username, `password`) 
values ('joao', 'Z7dL+3VaMV++fdWH0b8S3NV26muviRKuWXNk5ayr2RVBF9BE8tMorc/G7NB1P51lHzLhjc7irjXu+Q5f3T997w==');

insert into pessoafisica (cpf, nome, telefone, data_nascimento, id_usuario)
values ('999.999.999-00','João Víttor O','(99)9999-9999', CURRENT_DATE, 1);

insert into cliente (saldo, id_pessoa_fisica)
values (1000.00, 1);

insert into endereco (cep, rua, complemento, id_cliente)
values ('77001-000', 'Com asfalto', 'casa 2', 1);

-- ADICIONANDO FUNCIONARIO
insert into usuario (username, `password`) 
values ('rona', 'xMjCHZuQU+YIM0rmuq63vX4UgfwSDSsKE+9a+njtZWkjyD9dE9q6eZP7S5DMoRKXICJ//q4op6+AUmEVeMzkyw==');

insert into pessoafisica (cpf, nome, telefone, data_nascimento, id_usuario)
values ('000.111.222-33','Ronaldo','(00)0000-0000', CURRENT_DATE, 2);

insert into funcionario(codigo_contrato, data_admissao, id_pessoa_fisica)
values ('PJ#0001', CURRENT_DATE, 2);

insert into produto (nome, descricao, quantidade, preco_compra, preco_venda, id_fornecedor, id_marca)
values 
('Nike Air Max', 'Tênis de corrida Nike Air Max', 50, 150.00, 250.00, 1, 2),
('Nike Air Force 1', 'Tênis casual Nike Air Force 1', 40, 120.00, 200.00, 1, 2),
('Nike Dri-FIT', 'Camiseta Nike Dri-FIT', 30, 25.00, 50.00, 1, 2),
('Nike Tech Fleece', 'Moletom Nike Tech Fleece', 20, 80.00, 150.00, 1, 2),
('Nike Elite Backpack', 'Mochila Nike Elite', 15, 50.00, 100.00, 1, 2),
('Nike Pro Shorts', 'Shorts de compressão Nike Pro', 35, 30.00, 60.00, 1, 2),
('Meia Ultraboost', 'Meia Ultraboost', 55, 160.00, 270.00, 2, 1),
('Meia Stan Smith', 'Meia Stan Smith', 45, 100.00, 180.00, 2, 1),
('Meia Essentials Tee', 'Meia Essentials', 25, 20.00, 40.00, 2, 1),
('Meia Originals Hoodie', 'Meia Originals', 18, 70.00, 130.00, 2, 1),
('Meia Classic Backpack', 'Meia Classic', 12, 40.00, 90.00, 2, 1),
('Meia 3-Stripes Shorts', 'Meia 3-Stripes', 30, 25.00, 50.00, 2, 1);


insert into material (descricao,categoria) values ('Couro','Sintético');
insert into material (descricao,categoria) values ('Algodão','Natural');
