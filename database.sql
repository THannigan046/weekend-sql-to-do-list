CREATE TABLE tasks (
	id SERIAL,
	name varchar(256),
	complete BOOLEAN DEFAULT FALSE
);

INSERT INTO tasks (name)
VALUES ('get it together man'), ('move to philly'), 
('buy a loft'), ('start a noise band'), ('get 6 or 7 roommates'),
('eat hummus with them'), ('book some gigs'), ('burn down an applebees'),
('listen to animal collective'), ('start some kinda salsa company');