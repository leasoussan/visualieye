import express from 'express';
import { add_weekly_planner_slots, add_weekly_planner, get_user_current_week_data , get_slots_types} from '../controllers/planningController.js';

 const planning_router = express.Router();


planning_router.post('/add_weekly_planner/:user_id', add_weekly_planner);
planning_router.post('/add_weekly_planner_slots', add_weekly_planner_slots);
planning_router.get('/get_user_current_week_data/:user_id/:week_number', get_user_current_week_data);
planning_router.get('/get_slots_types', get_slots_types);

// planning_router.get('/slot_detail/:slot_id', slot_detail)
// planning_router.get('/goal_list/:user_id', goals_list)
// planning_router.put('/delete_goal/:id', edit_goal)
// planning_router.delete('/delete_goal/:id', delete_goal)

export default planning_router


