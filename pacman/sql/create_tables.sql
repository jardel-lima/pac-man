CREATE DATABASE IF NOT EXISTS pacman;
USE pacman;

CREATE TABLE IF NOT EXISTS `players_ranking` (
    player_name VARCHAR(15),
    player_score int,
    player_time int
);