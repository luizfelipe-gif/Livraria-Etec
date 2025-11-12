drop database library2025;
create database library2025;
use library2025;

INSERT INTO user(id, name, password, email, typeUser, createdAt, deletedAt) VALUES
(1, 'Cicrano de tal', '123456789', 'cicrano@email.com', 'comum', '2025-05-18 16:42:20', NULL),
(2, 'Beltrano das quantas', '123456789', 'beltrano@email.com', 'comum', '2025-05-18 16:42:43', NULL),
(3, 'Zé das Couves', '123456789', 'zedascouves@email.com', 'comum', '2025-05-18 16:42:47', NULL),
(4, 'Maria do Bairro', '123456789', 'mariabairro@email.com', 'comum', '2025-05-18 16:42:53', NULL),
(5, 'Tonho da Lua', '123456789', 'tonholua@email.com', 'comum', '2025-05-18 16:43:10', NULL),
(6, 'João Sem Braço', '123456789', 'joaosembraço@email.com', 'comum', '2025-05-18 16:43:25', NULL),
(7, 'Admin', '123456789', 'admin@email.com', 'admin', '2025-05-18 16:43:25', NULL),
(8, 'Comum', '123456789', 'comum@email.com', 'comum', '2025-05-18 16:43:25', NULL);

INSERT INTO author(id, name, birthday, nationality, createdAt, deletedAt) VALUES
(1, 'Ferréz', '2001-01-01', 'Brasileiro', '2025-05-22 21:26:33', NULL),
(2, 'Antoine de Saint Exupery', '2001-01-01', 'Francêsa', '2025-05-22 21:27:08', NULL),
(3, 'Machado de Assis', '2001-01-01', 'Brasileiro', '2025-05-22 21:27:37', NULL),
(4, 'Simon Stalenhag', '2001-01-01', 'Sueco', '2025-05-22 21:27:57', NULL),
(5, 'J. R. R. Tolkien', '2001-01-01', 'Britanico', '2025-05-22 21:29:12', NULL);

INSERT INTO category(id, name, createdAt, deletedAt) VALUES
(1, 'Terror', '2025-05-22 21:30:47', NULL),
(2, 'Suspense', '2025-05-22 21:30:52', NULL),
(3, 'Drama', '2025-05-22 21:30:56', NULL),
(4, 'Comédia', '2025-05-22 21:31:00', NULL),
(5, 'Romance', '2025-05-22 21:31:04', NULL),
(6, 'Infantil', '2025-05-22 21:44:35', NULL),
(7, 'Fantasia', '2025-05-22 22:09:53', NULL);

INSERT INTO publisher(id, name, cnpj, email, createdAt, deletedAt) VALUES
(1, 'Labortexto Editorial', 00112233445566, 'labortextoeditorial@gmail.com', '2025-05-22 21:32:01', NULL),
(2, 'Editora Abril', 00112233445566, 'editoraabril@gmail.com', '2025-05-22 21:33:15', NULL),
(3, 'Editora Saraiva', 00112233445566, 'editorasaraiva@gmail.com', '2025-05-22 21:33:26', NULL),
(4, 'Editora Rocco', 00112233445566, 'editorarocco@gmail.com', '2025-05-22 21:33:38', NULL),
(5, 'Editora Intrinseca', 00112233445566, 'editoraintrinsecao@gmail.com', '2025-05-22 21:34:08', NULL),
(6, 'Editora Alt', 00112233445566, 'editoraalt@gmail.com', '2025-05-22 21:36:45', NULL);

INSERT INTO book(id, bookName, publication, pages, price, createdAt, deletedAt, categoryId, publisherId) VALUES
(1, 'Capão Pecado', '2000-01-01', 144, 44.68, '2025-05-22 21:42:04', NULL, 3, 1),
(2, 'O pequeno principe', '1943-04-06', 176, 51.23, '2025-05-22 21:45:05', NULL, 2, 1),
(3, 'Dom Casmurro', '1899-01-01', 648, 40, '2025-05-22 21:47:10', NULL, 5, 6),
(4, 'Tales from the Loop', '2020-04-07', 128, 215.53, '2025-05-27 03:58:20', NULL, 7, 2),
(5, 'Senhor dos Anéis', '1954-07-29', 707, 124.57, '2025-05-27 04:01:32', NULL, 7, 5);

INSERT INTO bookauthor(authorId, bookId, createdAt, deletedAt) VALUES
(1, 1, '2025-05-22 21:42:04', NULL),
(2, 2, '2025-05-22 21:45:05', NULL),
(3, 3, '2025-05-22 21:47:10', NULL),
(4, 4, '2025-05-27 03:58:20', NULL),
(5, 5, '2025-05-27 04:01:32', NULL);

select * from user;
select * from author;
select * from category;
select * from publisher;
select * from book;
select * from bookauthor;
select * from profile;
select * from migrations;