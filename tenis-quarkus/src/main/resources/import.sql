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

insert into cupom(codigo, porcentagem_desconto, valor_desconto, data_cadastro, data_vencimento)
values
('DEZ10', 10, 0, CURRENT_DATE, '2025-10-20'),
('20VIN', 0, 20, CURRENT_DATE, '2025-06-21');

insert into endereco(cep,rua,complemento) values 
('111','rua 1','em frente a rua 2');

insert into telefone(ddd,numero,data_cadastro) 
values 
(99, 999999999, CURRENT_DATE),
(11, 111111111, CURRENT_DATE);

insert into material(descricao,categoria,data_cadastro) 
values 
('couro', 'sintético', CURRENT_DATE),
('tecido', 'natural', CURRENT_DATE),
('jeans', 'natural', CURRENT_DATE);


insert into categoria (nome, descricao, genero, faixa_etaria)
values
('Casual', 'Para tênis casuais', 'Unissex', 'Adulto'),
('Casual', 'Para tênis casuais', 'Unissex', 'Infantil'),
( 'Esportivo', 'Para tênis esportivos', 'Masculino', 'Adulto'),
( 'Esportivo', 'Para tênis esportivos', 'Feminino', 'Adulto'),
( 'Social', 'Para tênis sociais', 'Masculino', 'Adulto'),
( 'Social', 'Para tênis sociais', 'Feminino', 'Adulto'),
( 'Social', 'Para tênis sociais', 'Masculino', 'Infantil');


insert into tenis (nome, quantidade, peso, preco_compra, preco_venda, id_marca, id_material, id_cor, id_categoria, id_tamanho, nome_imagem)
values
('tenisPro1', 200, 120, 55, 110, 1, 1, 2, 1, 1, '2024-11-15-T-14h-30m-00s_123e4567-e89b-12d3-a456-426614174000.jpg'),
('tenisPro2', 150, 130, 60, 115, 2, 2, 2, 2, 2, '2024-11-15-T-14h-31m-00s_123e4567-e89b-12d3-a456-426614174001.png'),
('tenisPro3', 100, 140, 52, 105, 1, 3, 1, 3, 3, '2024-11-15-T-14h-32m-00s_123e4567-e89b-12d3-a456-426614174002.jpeg'),
('tenisPro4', 120, 110, 58, 108, 2, 1, 1, 4, 4, '2024-11-15-T-14h-33m-00s_123e4567-e89b-12d3-a456-426614174003.png'),
('tenisPro6', 300, 125, 65, 125, 2, 3, 1, 2, 6, '2024-11-15-T-14h-34m-00s_123e4567-e89b-12d3-a456-426614174004.jpg'),
('tenisPro5', 250, 115, 70, 130, 1, 2, 1, 1, 5, '2024-11-15-T-14h-35m-00s_123e4567-e89b-12d3-a456-426614174005.jpeg'),
('tenisPro7', 180, 135, 75, 140, 1, 1, 1, 3, 1, '2024-11-15-T-14h-36m-00s_123e4567-e89b-12d3-a456-426614174006.png'),
('tenisPro8', 210, 100, 50, 95, 2, 2, 2, 4, 2, '2024-11-15-T-14h-37m-00s_123e4567-e89b-12d3-a456-426614174007.jpg'),
('tenisPro10', 140, 140, 80, 150, 2, 1, 2, 2, 4, '2024-11-15-T-14h-38m-00s_123e4567-e89b-12d3-a456-426614174008.jpeg'),
('tenisPro9', 170, 105, 63, 120, 1, 3, 2, 1, 3, '2024-11-15-T-14h-39m-00s_123e4567-e89b-12d3-a456-426614174009.png');












insert into usuario (username, `password`) 
values ('joao', 'Z7dL+3VaMV++fdWH0b8S3NV26muviRKuWXNk5ayr2RVBF9BE8tMorc/G7NB1P51lHzLhjc7irjXu+Q5f3T997w==');

/*
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
*/