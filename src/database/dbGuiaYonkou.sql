-- Para workbench - localhost - desenvolvimento
CREATE DATABASE dbGuiaYonkou;
USE dbGuiaYonkou;

CREATE TABLE Usuario(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT
    ,nomeUsuario VARCHAR(100) NOT NULL
    ,email VARCHAR(100) UNIQUE NOT NULL
    ,senha VARCHAR(255) NOT NULL
);

CREATE TABLE Personagem(
	idPersonagem INT PRIMARY KEY AUTO_INCREMENT
    ,nomePersonagem VARCHAR(45) NOT NULL
    ,email VARCHAR(100) UNIQUE NOT NULL
    ,senha VARCHAR(255) NOT NULL
);

-- Usuário usado pela api do sistema
CREATE USER 'system'@'localhost' IDENTIFIED BY '#5_Sys_C0ntr0l_5@';

GRANT SELECT ON dbGuiaYonkou. * TO 'system'@'localhost';
GRANT UPDATE ON dbGuiaYonkou. * TO 'system'@'localhost';
GRANT DELETE ON dbGuiaYonkou. * TO 'system'@'localhost';
GRANT INSERT ON dbGuiaYonkou. * TO 'system'@'localhost';

FLUSH PRIVILEGES;