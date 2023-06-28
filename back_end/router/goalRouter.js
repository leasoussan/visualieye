import express from "express";
import { add_goal, goal_detail, profiler, goal_type, edit_goal, delete_goal } from '../controllers/goalController.js';

 const goal_router = express.Router();


goal_router.post('/add_goal', add_goal);
goal_router.get('/goal_detail/:id', goal_detail);
goal_router.get('/profiler/:user_id', profiler);
goal_router.get('/goal_type', goal_type);
goal_router.put('/edit_goal/:id', edit_goal);
goal_router.delete('/delete_goal/:id', delete_goal);

export default goal_router