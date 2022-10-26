-- Creation de la base de donnee

create database pokedex
character set utf8 collate utf8_unicode_ci;
use pokedex;


-- Structure de la table pokemon

CREATE TABLE IF NOT EXISTS pokemon (
  Img varchar(50) NOT NULL,
  Code int(3) NOT NULL,
  Nom varchar(50) NOT NULL,
  Type1 varchar(50) NOT NULL,
  Type2 varchar(50) NOT NULL,
  PRIMARY KEY (Code)
);

-- Contenu de la table 'pokemon'

INSERT INTO pokemon VALUES ('001.png',001,'Bulbizzare','Plante','Poison');
INSERT INTO pokemon VALUES ('002.png',002,'Herbizzare','Plante','Poison');
INSERT INTO pokemon VALUES ('003.png',003,'Florizzare','Plante','Poison');
