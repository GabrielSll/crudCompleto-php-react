--Criar banco de dados
CREATE DATABASE crud-newm;

--Criar tabela de usuarios/pessoas
CREATE TABLE `crud-newm`.`users`
(
    `id` int NOT NULL auto_increment,
    `name` varchar(50),
    `email` varchar(60),
    `cpf` varchar(25),
    `dataNascimento` varchar(20),
    `telefone` varchar(20)
	`endereco` varchar(120), PRIMARY KEY (id)
);