-- TASKS
-- Create a CODE that will CREATE the databse from runing the script in Terminal.
-- Create a CODE that will POPULATE the databse from runing the script in Terminal.


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username varchar(255),
    email varchar(255),
    password VARCHAR(255) NOT NULL
);


-- Creating Goal Table and FK 
-- The Goal architecture aim to have user greating a goal that will be the parent for checkpoints which will be the 
-- steps to do for the project to scucced 
-- and the steps for each checkpoint. 


-- goal type will be to know which one of the component the user is on:
-- Goal Type are Main, Planing, Health, Wealth.

CREATE TABLE goal_type(
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL
);

-- Goal state will be to determin the progress of the goal and monitor to success
CREATE TABLE goal_state(
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL
);


-- the Goal tablke will hold the specification of the Gloabl Goal 
CREATE TABLE goal (
    goal_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    goal_type INTEGER REFERENCES goal_type(id),
    starting_date TIMESTAMP NOT NULL,
    end_date DATE NOT NULL,
    goal_status INTEGER REFERENCES goal_state(id),
    accomplished BOOLEAN
);



-- CREATE TABLE goal_subject (
--     goal_subject_id SERIAL PRIMARY KEY,
--     goal_subject_goal_type_id INTEGER REFERENCES goal_type(id) NOT NULL ON DELETE CASCADE,
--     goal_subject_name VARCHAR(100) NOT NOT,
--     goal_subject_start_date TIMESTAMP,
--     goal_subject_status VARCHAR(50),
--     goal_subject_grade INTEGER
-- )

-- the checkoipints are milestones for the projects to be acheived- like a chapter to reach 
-- this checkopint will have steps that are connected to it. 

<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> d0c80186e68e72fc476a0c695de2461189eae4b5
=======
>>>>>>> planner
CREATE TABLE goal_checkpoint (
    goal_ckpt_id SERIAL PRIMARY KEY,
    goal_ckpt_goal_id INTEGER REFERENCES goal(goal_id) ON DELETE CASCADE,
    goal_ckpt_title VARCHAR(255) NOT NULL, 
    goal_ckpt_expected_time DATE NOT NULL, 
    goal_ckpt_notes TEXT,
    goal_ckpt_order  INTEGER
    );


CREATE TABLE ckpt_res_type (
    ckpt_res_type_id SERIAL PRIMARY KEY,
    ckpt_res_type_name INTEGER NOT NULL
);


CREATE TABLE checkpoint_resource (
    ckpt_resource_id SERIAL PRIMARY KEY,
    ckpt_resource_type INTEGER REFERENCES ckpt_res_type(ckpt_res_type_id)  NOT NULL,
    ckpt_resource_content TEXT NOT NULL,
);


CREATE TABLE checkpoint_step (
    ckpt_step_id SERIAL PRIMARY KEY,
    ckpt_step_title VARCHAR(255) NOT NULL,
    ckpt_step_action_time INTEGER NOT NULL,
    ckpt_step__notes TEXT,
    ckpt_step_resource INTEGER REFERENCES checkpoint_resource(ckpt_resource_id)  ON DELETE CASCADE,
    ckpt_step_status INTEGER,    
);
-- CREATE TABLE goal_checkpoint (
--     goal_ckpt_id SERIAL PRIMARY KEY,
--     goal_ckpt_goal_id INTEGER REFERENCES goal(goal_id) ON DELETE CASCADE,
--     goal_ckpt_title VARCHAR(255) NOT NULL,
--     goal_ckpt_expected_time DATE NOT NULL,
--     goal_ckpt_notes TEXT,
--     goal_ckpt_order  INTEGER
--     );
--
--
-- CREATE TABLE ckpt_res_type (
--     ckpt_res_type_id SERIAL PRIMARY KEY,
--     ckpt_res_type_name INTEGER NOT NULL
-- );
--
--
-- CREATE TABLE checkpoint_resource (
--     ckpt_resource_id SERIAL PRIMARY KEY,
--     ckpt_resource_type INTEGER REFERENCES ckpt_res_type(ckpt_res_type_id)  NOT NULL,
--     ckpt_resource_content TEXT NOT NULL,
-- );
--
--
-- CREATE TABLE checkpoint_step (
--     ckpt_step_id SERIAL PRIMARY KEY,
--     ckpt_step_title VARCHAR(255) NOT NULL,
--     ckpt_step_action_time INTEGER NOT NULL,
--     ckpt_step__notes TEXT,
--     ckpt_step_resource INTEGER REFERENCES checkpoint_resource(ckpt_resource_id) NOT NULL ON DELETE CASCADE,
--     ckpt_step_status INTEGER,
-- );


--------------------------------PLANNER

-- this is the planing Section
-- The goal of the planing is to collect the time slots and to show available slots if any or placing the actions to be done.
-- slots type will be all the choices under categories to save the actions requested. Pre-Set

CREATE TABLE weekly_planner (
    weekly_planner_id SERIAL PRIMARY KEY, 
    weekly_planner_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    weekly_planner_start_date DATE NOT NULL, 
    weekly_planner_end_date DATE NOT NULL, 
    weekly_planner_is_current_week BOOLEAN NOT NULL DEFAULT false,
    weekly_planner_week_number INTEGER NOT NULL
)


CREATE TABLE slot_type (
    slot_id SERIAL PRIMARY KEY, 
    name VARCHAR(50) NOT NULL,

);

-- each slot represnet on the planning time frame. the user will have access to a 3 weeks at the time
-- past week, present week, and next week.
-- 
CREATE TABLE weekly_slots_per_category (
    weekly_slots_per_category_id SERIAL PRIMARY KEY, 
    weekly_slots_per_category_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    weekly_slots_per_category_planner_id INT REFERENCES weekly_planner(weekly_planner_id) ON DELETE CASCADE,
    weekly_slots_per_category_type INT REFERENCES slot_type(slot_id) NOT NULL, 
    weekly_slots_per_category_day_time TEXT[],
    weekly_slots_per_category_transportation_time TEXT[] 
);





----------------------POPULATE DATABASE



INSERT INTO users(id,username, email,password)
VALUES('1', 'lea', 'le@sad.com', '123'),
   ( '2', 'lo', 'leous@sad.com', '123'),
    ( '3', 'li', 'lea@sad.com', '123')

INSERT INTO goal_type(name)
VALUES('main'),
('planner'),
('health'),
('money')

INSERT INTO goal_subject( goal_subject_name,  goal_subject_start_date, goal_subject_status, goal_subject_grade, goal_subject_goal_type_id )
VALUES
('sleep', null, null, null,3),
('eat', null, null, null,3),
('meditation', null, null, null,3),
('exercice', null, null, null,3),
('money_management', null, null, null,4),
('visualise', null, null, null,3),
('visualise', null, null, null,4),
('affirmation', null, null, null,3)
('affirmation', null, null, null,4)



INSERT INTO goal_state (name)
VALUES('pre_setting'),
	   ('in_action'), 
	   ('reinforcing'), 
	   ('accomplished')




INSERT INTO goal (title, goal_type, start_date, end_date, accomplished, goal_status,  user_id) 
VALUES('miamibound', 1, '2023-06-28', '2023-09-01', false, 1, 1),
('MVPCompany', 1, '2023-06-28', '2023-09-01', false, 1, 2),
('quiteSmoking', 1, '2023-06-28', '2023-09-01', false, 1, 3)


INSERT INTO weekly_planner (weekly_planner_user_id, weekly_planner_start_date, weekly_planner_end_date, weekly_planner_is_current_week, weekly_planner_week_number)
VALUES(4,'2023-08-13', '2023-08-19', true, 33 )


INSERT INTO slot_type (slot_type_name)
VALUES
('learn' ),
('clean_home' ),
('main_work' ),
('eat' ),
('transportation' ),
('family_friend' ),
('tv' ),
('internet' ),
('personal_time' ),
('excercies' )


INSERT INTO weekly_slots_per_category (
            weekly_slots_per_category_user_id,
            weekly_slots_per_category_planner_id,
            weekly_slots_per_category_type,
            weekly_slots_per_category_day_time
            )
VALUES     (4, 
            1, 
            2, 
            ARRAY[
            '{"day": "2022-08-13", "timeRange": {"start": "11:30", "end": "13:30"}, "transportation": {"to": "30", "from": "20"}}',
            '{"day": "2022-08-15", "timeRange": {"start": "11:30", "end": "13:30"},  "transportation": {"to": "30", "from": "20"}}',
            '{"day": "2022-08-17", "timeRange": {"start": "14:30", "end": "18:30"},  "transportation": {"to": "30", "from": "20"}}'])







CREATE TABLE user_slot (
    user_slot_id SERIAL PRIMARY KEY, 
    user_slot_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    user_slot_planner_id INT REFERENCES weekly_planner(weekly_planner_id) ON DELETE CASCADE,
    user_slot_type INT REFERENCES slot_type(slot_id) NOT NULL, 
    user_slot_starting_time TIMESTAMP NOT NULL,
    user_slot_end_time TIMESTAMP NOT NULL,
    user_slot_weekday INTEGER NOT NULL,
    user_slot_transportation BOOLEAN,
    user_slot_transportation_time INTEGER. 
);


