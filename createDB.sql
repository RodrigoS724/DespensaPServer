DROP DATABASE IF EXISTS moviesdb;
CREATE DATABASE moviesdb;

USE moviesdb;

CREATE TABLE movie (
	id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
	title VARCHAR(250) NOT NULL,
	year INT NOT NULL,
	director VARCHAR(250) NOT NULL,
	duration INT NOT NULL,
	poster TEXT,
	rate DECIMAL(2, 1) NOT NULL
);

CREATE TABLE genre (
	id INT(1) AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(250) NOT NULL UNIQUE
	);
	
CREATE TABLE movie_genre (
	movie_id BINARY(16) REFERENCES movie(id),
	genre_id INT REFERENCES genre(id),
	PRIMARY KEY (movie_id, genre_id)
	);
	
	INSERT INTO genre (name) VALUES
	('Drama'),
	('Action'),
	('Crime'),
	('Adventure'),
	('Sci-Fi'),
	('Romance'),
	('Sex');
	INSERT INTO movie(id, title, YEAR, director, duration, poster, rate) VALUES
	(UUID_TO_BIN(UUID()), "The Shawshank Redemption", 1994, "Frank Darabont", 142, "https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp", 8.8),
	(UUID_TO_BIN(UUID()), "The Dark Knight", 1994, "Frank Darabont", 142, "https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg", 8.8),
	(UUID_TO_BIN(UUID()), "Inception", 1994, "Frank Darabont", 142, "https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg", 8.8),
	(UUID_TO_BIN(UUID()), "Pulp Fiction", 1994, "Frank Darabont", 142, "https://www.themoviedb.org/t/p/original/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg", 8.8);
	
	
	INSERT INTO movie_genre (movie_id, genre_id) VALUES
	((SELECT id FROM movie WHERE title = "The Shawshank Redemption"),(SELECT id FROM genre WHERE name = "Action")),
	((SELECT id FROM movie WHERE title = "The Dark Knight"),(SELECT id FROM genre WHERE name = "Action")),
	((SELECT id FROM movie WHERE title = "Inception"),(SELECT id FROM genre WHERE name = "Action")),
	((SELECT id FROM movie WHERE title = "Pulp Fiction"),(SELECT id FROM genre WHERE name = "Action"));
	
	
	SELECT * FROM movie;