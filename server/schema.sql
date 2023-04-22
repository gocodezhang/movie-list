DROP DATABASE moviesDB;

CREATE DATABASE moviesDB;

USE moviesDB;

CREATE TABLE movies (
  movie_id INT NOT NULL AUTO_INCREMENT,
  title varchar(100),
  watch varchar(10),
  `year` varchar(10),
  runtime varchar(30),
  rating DECIMAL(3,1),
  picture TEXT,
  PRIMARY KEY (movie_id)
)