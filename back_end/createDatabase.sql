
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username varchar(255),
    email varchar(255),
    password VARCHAR(255) NOT NULL,
);


CREATE TABLE goal_type(
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL
);


CREATE TABLE goal_state(
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL
);



CREATE TABLE goal (
    goal_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    goal_type INTEGER REFERENCES goal_type(id),
    starting_date TIMESTAMP NOT NULL,
    end_date DATE NOT NULL,
    goal_status INTEGER REFERENCES goal_state(id),
    accomplished BOOLEAN,
    goal_order VARCHAR(50) CHECK(goal_order IN ('main', 'secondary', 'health', 'wealth'))
);

CREATE TABLE slot_type (
    slot_id SERIAL PRIMARY KEY, 
    name VARCHAR(50) NOT NULL,

);

CREATE TABLE metting_type (
    mt_id SERIAL PRIMARY KEY, 
    name VARCHAR(50) NOT NULL,

);


CREATE TABLE slot (
    slot_id SERIAL PRIMARY KEY, 
    user_id INT REFERENCES users(id) NOT NULL ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    slot_type INT REFERENCES slot_type(slot_id) NOT NULL, 
    starting_time TIME NOT NULL,
    end_time TIME NOT NULL,
    day_of_week VARCHAR(100) NOT NULL,
    transportation BOOLEAN,
    fixed_slot BOOLEAN NOT NULL,
);


CREATE TABLE meeting (
    metting_id SERIAL PRIMARY KEY, 
    user_id INT REFERENCES users(id) NOT NULL ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    metting_type INT REFERENCES metting_type(mt_id) NOT NULL, 
    starting_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL, 
    time_needed INT NOT NULL,
    transportation BOOLEAN,
);

-- CREATE TABLE action_type(
--     id SERIAL PRIMARY KEY
--     name VARCHAR(100)
-- )

-- CREATE TABLE goals_steps(
--     id SERIAL PRIMARY KEY,
--     title VARCHAR(200) NOT NULL,
--     goal_id INT REFERENCES goal(id) NOT NULL ON DELETE CASCADE,
--     action_type INT REFERENCES action_type(action_id),
--     accomplished BOOLEAN,
--     affirmation VARCHAR(500) NOT NULL,
--     instructions TEXT NOT NULL,
--     time_needed INT 
-- )


INSERT INTO goal_state (name)
VALUES('pre_setting'),
	   ('in_action'), 
	   ('reinforcing'), 
	   ('accomplished')


INSERT INTO action_type (name)
VALUES('visualisation', 'affirmation', 'creation', 'realisation')



INSERT INTO users(first_name,last_name,username, email,password)
VALUES('leo', 'lea', 'leole', 'le@sad.com', 'safd768sa7df'),
   ( 'luna', 'laura', 'less', 'leous@sad.com', 'safd768sa7df'),
    ( 'lilo', 'lilou', 'lsedrf', 'lea@sad.com', 'safd768sa7df')
   

INSERT INTO goal_steps(title, goal_id, action_type, accomplished, affirmation, instructions, time_needed)
VALUES ("create Vision text",1,1, false, 'im the best and I know it', 'got to the beach for 2 hours and write ', 120 )


INSERT INTO goal (title, goal_type, start_date, end_date, accomplished, user_id, image_one, image_two, notes) 
VALUES('miamibound', 3, '2022-12-01', '2023-01-10', false, 1, 'https://i.insider.com/61cb5aff3f07f800184d2d43?width=1000&format=jpeg&auto=webp','https://i.insider.com/61cb5aff3f07f800184d2d43?width=1000&format=jpeg&auto=webp', 'im going to change my life')

INSERT INTO goal_type(name)
VALUES
('main'),
('secondary'),
('health'),
('money')

