DROP TABLE IF EXISTS regions;

CREATE TABLE regions(
   id BIGINT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR (250)
);

DROP TABLE IF EXISTS clientes;

CREATE TABLE clientes(
   id BIGINT AUTO_INCREMENT PRIMARY KEY,
   nombre VARCHAR (250) NOT NULL,
   apellido VARCHAR (250) NOT NULL,
   email VARCHAR (250) NOT NULL UNIQUE,
   created_at TIMESTAMP NOT NULL,
   photo VARCHAR (250),
   region_id BIGINT NOT NULL,
   FOREIGN KEY (region_id) REFERENCES regions
);

DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS usuarios_roles;

CREATE TABLE roles(
   id BIGINT AUTO_INCREMENT PRIMARY KEY,
   nombre VARCHAR (30) UNIQUE
);

CREATE TABLE usuarios(
   id BIGINT AUTO_INCREMENT PRIMARY KEY,
   enabled BOOLEAN,
   username VARCHAR (20) UNIQUE,
   password VARCHAR (60)
);

CREATE TABLE usuarios_roles(
   usuario_id BIGINT NOT NULL,
   role_id BIGINT NOT NULL,
   PRIMARY KEY (usuario_id, role_id),
   FOREIGN KEY (role_id) REFERENCES roles,
   FOREIGN KEY (usuario_id) REFERENCES usuarios
);
