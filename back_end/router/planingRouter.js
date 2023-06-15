import express from 'express';
import { add_slot, slot_detail } from '../controllers/planningController.js';

 const planning_router = express.Router();


planning_router.post('/add_slot', add_slot)
planning_router.get('/slot_detail/:slot_id', slot_detail)
// planning_router.get('/goal_list/:user_id', goals_list)
// planning_router.put('/delete_goal/:id', edit_goal)
// planning_router.delete('/delete_goal/:id', delete_goal)

export default planning_router

