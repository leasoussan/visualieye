import express from 'express';
import { add_weekly_planner_and_slots } from '../controllers/weekly_planning/SavingWeeklyPlanningController.js';
import { get_user_current_week_data } from '../controllers/weekly_planning/UserWeeklyPlannerController.js';
import { get_slots_types } from '../controllers/weekly_planning/SlotsTypeController.js';

 const planning_router = express.Router();


planning_router.post('/add_weekly_planner_and_slots/:user_id', add_weekly_planner_and_slots);
// planning_router.post('/add_weekly_planner_slots/:user_id/:planner_id', add_weekly_planner_slots);
planning_router.get('/get_user_current_week_data/:user_id/:week_number', get_user_current_week_data);
planning_router.get('/get_slots_types', get_slots_types);

// planning_router.get('/slot_detail/:slot_id', slot_detail)
// planning_router.get('/goal_list/:user_id', goals_list)
// planning_router.put('/delete_goal/:id', edit_goal)
// planning_router.delete('/delete_goal/:id', delete_goal)

export default planning_router


