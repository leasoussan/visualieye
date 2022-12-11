
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    username varchar(255),
    email varchar(255),
    password_1 VARCHAR(255) NOT NULL,
    password_2 VARCHAR(255) NOT NULL
);


CREATE TABLE goal_type(
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL
)


CREATE TABLE goal(
	id SERIAL PRIMARY KEY,
	title VARCHAR(200) NOT NULL,
	goal_type INT REFERENCES goal_type(id) ,
	start_date TIMESTAMP NOT NULL,
	end_date DATE NOT NULL,
	accomplished BOOLEAN NOT NULL,
    user_id REFERENCES users(id) ON DELETE CASCADE,
    image_one VARCHAR(500), 
    image_two VARCHAR(500),
    notes TEXT(),
)




CREATE TABLE action_type(
    id SERIAL PRIMARY KEY
    name VARCHAR(100)
)

CREATE TABLE goals_steps(
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    goal_id INT REFERENCES goal(id) NOT NULL ON DELETE CASCADE,
    action_type INT REFERENCES action_type(action_id),
    accomplished BOOLEAN,
    affirmation VARCHAR(500) NOT NULL,
    instructions TEXT NOT NULL,
    time_needed INT 
)



INSERT INTO action_type (name)
VALUES('visualisation', 'affirmation', 'creation', 'realisation')



INSERT INTO users(first_name,last_name,username, email,password)
VALUES('leo', 'lea', 'leole', 'le@sad.com', 'safd768sa7df', 'safd768sa7df'),
   ( 'luna', 'laura', 'less', 'leous@sad.com', 'safd768sa7df', 'safd768sa7df'),
    ( 'lilo', 'lilou', 'lsedrf', 'lea@sad.com', 'safd768sa7df', 'safd768sa7df')
   

INSERT INTO goal_steps(title, goal_id, action_type, accomplished, affirmation, instructions, time_needed)
VALUES ("create Vision text",1,1, false, 'im the best and I know it', 'got to the beach for 2 hours and write ', 120 )


INSERT INTO goal (title, goal_type, start_date, end_date, accomplished, user_id, image_one, image_two, notes) 
VALUES('miamibound', 3, '2022-12-01', '2023-01-10', false, 1, 'https://i.insider.com/61cb5aff3f07f800184d2d43?width=1000&format=jpeg&auto=webp','https://i.insider.com/61cb5aff3f07f800184d2d43?width=1000&format=jpeg&auto=webp', 'im going to change my life')

INSERT INTO goal_type(name)
VALUES('money'),
('health'),
('creative'),
('knowledge'),
('mindset')
