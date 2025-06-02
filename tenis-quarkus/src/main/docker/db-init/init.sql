create table marca (
    id serial primary key,
    nome varchar(100) not null unique,
    logo varchar(500) not null
);

create table tamanho (
    id serial primary key,
    numeracao integer not null,
    tamanho_em_cm varchar(10) not null,
    pais varchar(5) not null,
    data_cadastro date not null
);

create table cor (
    id serial primary key,
    nome varchar(50) not null unique,
    codigo_hex varchar(10) not null,
    data_cadastro date not null
);

create table cupom (
    id serial primary key,
    codigo varchar(50) not null unique,
    porcentagem_desconto numeric(5,2) not null,
    valor_desconto numeric(10,2) not null,
    data_cadastro date not null,
    data_vencimento date not null
);

create table telefone (
    id serial primary key,
    ddd integer not null,
    numero bigint not null,
    data_cadastro date not null
);

create table material (
    id serial primary key,
    descricao varchar(100) not null,
    categoria varchar(50) not null,
    data_cadastro date not null
);

create table categoria (
    id serial primary key,
    nome varchar(100) not null unique,
    descricao varchar(255) not null,
    genero varchar(20) not null,
    faixa_etaria varchar(20) not null
);

create table tenis (
    id serial primary key,
    nome varchar(100) not null,
    quantidade integer not null,
    peso numeric(10,2) not null,
    preco_compra numeric(10,2) not null,
    preco_venda numeric(10,2) not null,
    id_marca integer not null references marca(id),
    id_material integer not null references material(id),
    id_cor integer not null references cor(id),
    id_categoria integer not null references categoria(id),
    id_tamanho integer not null references tamanho(id),
    nome_imagem varchar(255) not null
);

insert into marca(nome,logo) 
values 
('Nike', 'https://upload.wikimedia.org/wikipedia/commons/3/36/Logo_nike_principal.jpg'), 
('Adidas', 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg'),
('Puma', 'https://cdn.1min30.com/wp-content/uploads/2017/07/Symbole-Puma.jpg'),
('Reebok', 'https://th.bing.com/th/id/OIP.4DzknpkBwKwcDQK2YXZ-HQHaFj?w=2272&h=1704&rs=1&pid=ImgDetMain'),
('Converse', 'https://static.vecteezy.com/system/resources/previews/023/599/728/original/converse-all-star-logo-shoes-brand-black-symbol-design-illustration-free-vector.jpg'),
('Vans', 'https://th.bing.com/th?id=OIP.eUV0w-TxPQPUxi1-jtdOqwAAAA&w=335&h=140&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2'),
('New Balance', 'https://cdn.worldvectorlogo.com/logos/new-balance-2.svg'),
('Asics', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Asics_Logo.svg/1200px-Asics_Logo.svg.png'),
('Fila', 'https://logos-world.net/wp-content/uploads/2020/10/Fila-Logo.jpg'),
('Under Armour', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Under_armour_logo.svg/2560px-Under_armour_logo.svg.png'),
('Mizuno', 'https://w7.pngwing.com/pngs/791/249/png-transparent-mizuno-corporation-logo-asics-golf-harder-sporting-goods-golf-text-trademark-logo-thumbnail.png'),
('Skechers', 'https://xelymavi.com.br/media/mgs/brand/Skechers_logo_PNG1.png'),
('Hoka One One', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlK633SdyvxkTsIaO97OrSIw6wvCiA6Ib_3w&s'),
('Salomon', 'https://cdn.worldvectorlogo.com/logos/salomon-logo.svg');


insert into tamanho(numeracao, tamanho_em_cm, pais, data_cadastro) 
values 
(36, '24.5', 'BR', CURRENT_DATE),
(37, '25', 'BR', CURRENT_DATE),
(38, '25.5', 'BR', CURRENT_DATE),
(39, '26', 'BR', CURRENT_DATE),
(40, '26.5', 'BR', CURRENT_DATE),
(41, '27', 'BR', CURRENT_DATE),
(42, '27.5', 'BR', CURRENT_DATE),
(43, '28', 'BR', CURRENT_DATE),
(44, '28.5', 'BR', CURRENT_DATE),
(45, '29', 'BR', CURRENT_DATE),
(46, '29.5', 'BR', CURRENT_DATE);

insert into cor(nome, codigo_hex, data_cadastro)
values
('Preto', 'FFFFFFF', CURRENT_DATE),
('Branco', '0000000', CURRENT_DATE),
('Azul Marinho', '000080', CURRENT_DATE),
('Vermelho', 'FF0000', CURRENT_DATE),
('Cinza', '808080', CURRENT_DATE),
('Verde Militar', '4B5320', CURRENT_DATE),
('Amarelo', 'FFFF00', CURRENT_DATE),
('Rosa', 'FFC0CB', CURRENT_DATE),
('Vinho', '800020', CURRENT_DATE),
('Azul Claro', 'ADD8E6', CURRENT_DATE),
('Bege', 'F5F5DC', CURRENT_DATE),
('Marrom', '8B4513', CURRENT_DATE),
('Lilás', 'C8A2C8', CURRENT_DATE),
('Laranja', 'FFA500', CURRENT_DATE),
('Turquesa', '40E0D0', CURRENT_DATE),
('Verde Limão', '32CD32', CURRENT_DATE);

insert into cupom(codigo, porcentagem_desconto, valor_desconto, data_cadastro, data_vencimento)
values
('DEZ10', 10, 0, CURRENT_DATE, '2025-10-20'),
('20VIN', 0, 20, CURRENT_DATE, '2025-06-21'),
('FRETE50', 0, 50, CURRENT_DATE, '2025-12-31'),
('BLACKFRIDAY', 30, 0, CURRENT_DATE, '2025-11-30'),
('TOPICOS2', 30, 0, CURRENT_DATE, '2026-12-30'),
('ANGULAR', 15, 0, CURRENT_DATE, '2026-11-30'),
('WELCOME20', 20, 0, CURRENT_DATE, '2025-12-31');

insert into telefone(ddd, numero, data_cadastro) 
values 
(99, 999999999, CURRENT_DATE),
(11, 111111111, CURRENT_DATE),
(21, 912345678, CURRENT_DATE),
(31, 998765432, CURRENT_DATE),
(85, 987654321, CURRENT_DATE),
(11, 912345678, CURRENT_DATE),
(21, 987654321, CURRENT_DATE),
(31, 998765432, CURRENT_DATE),
(41, 912345678, CURRENT_DATE),
(51, 987654321, CURRENT_DATE),
(61, 998765432, CURRENT_DATE),
(71, 912345678, CURRENT_DATE),
(81, 987654321, CURRENT_DATE),
(91, 998765432, CURRENT_DATE),
(62, 912345678, CURRENT_DATE),
(12, 923456789, CURRENT_DATE),
(22, 976543210, CURRENT_DATE),
(32, 945678123, CURRENT_DATE),
(42, 934567812, CURRENT_DATE),
(52, 987654309, CURRENT_DATE),
(62, 934567812, CURRENT_DATE),
(72, 934567812, CURRENT_DATE),
(82, 934567812, CURRENT_DATE),
(92, 934567812, CURRENT_DATE),
(63, 934567812, CURRENT_DATE);


insert into material(descricao, categoria, data_cadastro) 
values 
('Couro', 'sintético', CURRENT_DATE),
('Tecido', 'natural', CURRENT_DATE),
('Jeans', 'natural', CURRENT_DATE),
('Nylon', 'sintético', CURRENT_DATE),
('Lona', 'natural', CURRENT_DATE),
('Cortiça', 'natural', CURRENT_DATE),
('Borracha', 'sintético', CURRENT_DATE),
('Couro Vegano', 'sintético', CURRENT_DATE),
('Microfibra', 'sintético', CURRENT_DATE),
('Camurça', 'natural', CURRENT_DATE),
('PVC', 'sintético', CURRENT_DATE),
('EVA', 'sintético', CURRENT_DATE),
('Malha', 'natural', CURRENT_DATE),
('Espuma', 'sintético', CURRENT_DATE),
('Poliéster', 'sintético', CURRENT_DATE);

insert into categoria(nome, descricao, genero, faixa_etaria)
values
('Fitness', 'Tênis para exercícios e treinos em academias', 'Unissex', 'Adulto'),
('Fashion', 'Tênis estilizados, combinando moda e conforto', 'Unissex', 'Adulto'),
('Outdoor', 'Tênis ideais para atividades ao ar livre e terrenos acidentados', 'Masculino', 'Adulto'),
('Retrô', 'Tênis com design inspirado em modelos clássicos de décadas passadas', 'Unissex', 'Adulto'),
('Slip-on', 'Tênis sem cadarço, práticos para o dia a dia', 'Feminino', 'Adulto'),
('Infantil Esportivo', 'Tênis esportivos para crianças', 'Unissex', 'Infantil'),
('Casual Clássico', 'Tênis de estilo clássico para uso cotidiano', 'Masculino', 'Adulto'),
('Running', 'Tênis projetados para alta performance em corridas de longa distância.', 'Unissex', 'Adulto');



insert into tenis(nome, quantidade, peso, preco_compra, preco_venda, id_marca, id_material, id_cor, id_categoria, id_tamanho, nome_imagem)
values
('Air Max Revolution', 150, 110, 70, 140, 1, 1, 1, 1, 1, '9.jpg'),
('Trail Blazer Pro', 120, 130, 90, 180, 2, 3, 4, 2, 2, 'trail.jpg'),
('Urban Street 2.0', 200, 125, 60, 120, 3, 2, 2, 3, 3, 'urban.jpg'),
('Skater Xtreme', 180, 140, 75, 150, 4, 4, 3, 4, 4, 'xtreme.jpg'),
('RunFaster Elite', 100, 115, 85, 170, 1, 1, 4, 1, 5, 'skechers.jpg'),
('Adventure Path', 90, 145, 100, 200, 2, 3, 2, 2, 6, 'adventure.jpg'),
('Retro Classic', 300, 135, 50, 100, 3, 2, 1, 3, 7, 'retro.jpg'),
('Vans Old Skool', 250, 120, 55, 110, 4, 2, 3, 4, 8, 'vansold.jpg'),
('Nike Air Zoom Pegasus', 200, 120, 85, 170, 1, 1, 1, 1, 3, 'nike.jpg'),
('Adidas Ultraboost 22', 150, 130, 95, 190, 2, 3, 2, 1, 4, 'adidas.jpg'),
('Reebok Nano X1', 100, 140, 70, 140, 4, 5, 4, 2, 6, 'rebook.jpg'),
('Chuck Taylor All Star', 250, 130, 60, 120, 5, 2, 1, 3, 7, 'allstar.jpg'),
('Vans Sk8-Hi', 200, 135, 65, 130, 6, 3, 2, 4, 8, 'vanssk.jpg'),
('New Balance 990v5', 220, 125, 90, 180, 7, 1, 3, 1, 9, 'new.jpg'),
('Asics Gel-Kayano 27', 150, 140, 100, 200, 8, 4, 4, 2, 10, 'asics.jpg'),
('Fila Disruptor 2', 250, 120, 50, 100, 9, 2, 1, 1, 11, 'filadis.jpg'),
('Under Armour HOVR', 180, 130, 95, 190, 10, 1, 3, 1, 10, 'under.jpeg'),
('Mizuno Wave Rider 25', 120, 135, 80, 160, 11, 3, 2, 1, 1, 'minuzo.jpg'),
('Skechers Go Run Razor', 200, 120, 60, 120, 12, 4, 1, 1, 2, 'skeches.jpg'),
('Hoka One One Clifton 8', 150, 125, 100, 200, 13, 5, 2, 2, 5, 'hoka.jpg'),
('Salomon Speedcross 5', 180, 150, 90, 180, 14, 3, 3, 3, 6, 'salomon.jpg'),
('Nike React Infinity', 220, 130, 85, 170, 1, 1, 1, 1, 7, 'react.jpg'),
('Adidas Pureboost 21', 150, 135, 90, 180, 2, 4, 2, 2, 8, 'future.jpg'),
('Puma Future Rider', 180, 125, 75, 150, 3, 2, 1, 3, 9, 'purebost.jpg'),
('Reebok Classic Leather', 200, 130, 60, 120, 4, 2, 3, 4, 3, 'reebok.jpg'),
('Converse All Star Pro', 250, 135, 55, 110, 5, 1, 4, 3, 4, 'allstarpro.jpg'),
('Vans Authentic', 300, 120, 50, 100, 6, 1, 1, 3, 6, 'authentic.jpg'),
('New Balance 1080v11', 180, 135, 95, 190, 7, 2, 3, 2, 8, 'newbalance.jpg'),
('Asics Gel Nimbus 23', 150, 140, 100, 200, 8, 4, 2, 1, 9, 'nimbus.jpg'),
('Fila Ray Tracer', 200, 125, 60, 120, 9, 3, 4, 3, 10, 'ray.jpg'),
('Under Armour Charged', 180, 130, 80, 160, 10, 5, 2, 1, 11, 'underverde.jpg'),
('Mizuno Wave Inspire 17', 150, 130, 90, 180, 11, 2, 3, 2, 10, 'minuzo17.jpg'),

('Slip on 1', 150, 110, 70, 140, 1, 1, 1, 5, 1, 'slip1.jpg'),
('Slip on 2', 150, 110, 80, 160, 2, 2, 2, 5, 3, 'slip2.jpg'),
('Slip on 3', 150, 110, 90, 180, 3, 3, 3, 5, 4, 'slip3.jpg'),

('Infantil 1', 150, 110, 90, 180, 4, 4, 4, 6, 5, 'inf1.jpg'),
('Infantil 2', 150, 110, 90, 130, 5, 5, 5, 6, 6, 'inf2.jpg'),
('Infantil 3', 150, 110, 90, 140, 6, 6, 6, 6, 7, 'inf3.jpg'),

('Casual 1', 150, 110, 90, 175, 7, 7, 7, 7, 8, 'cas1.jpg'),
('Casual 2', 150, 110, 90, 165, 8, 8, 8, 7, 9, 'cas2.jpg'),
('Casual 3', 150, 110, 90, 180, 9, 9, 9, 7, 10, 'cas3.jpg'),


('Puma RS-X3', 180, 125, 80, 160, 3, 4, 3, 1, 5, '1.jpg');






