CREATE TABLE tasks (
	id SERIAL,
	name varchar(256),
	complete BOOLEAN DEFAULT FALSE
);

INSERT INTO tasks (name)
VALUES ('wash dishes'), ('smoke crack'), ('hail satan');