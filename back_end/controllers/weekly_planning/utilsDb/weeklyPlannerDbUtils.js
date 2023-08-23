import db from '../../../data/database.js'
import { DateTime } from 'luxon';

// this methode aim to insert Data into DB - plain query insertion and returning the created object 
export const dbRequest = {
    CreateWeeklyPlanner: async (WeeklyPlannerData, trx) => {
        const recieved_start = WeeklyPlannerData.weekly_planner_start_date
        const start_week = DateTime.fromJSDate(WeeklyPlannerData.weekly_planner_start_date);
        console.log("recieved_start with modification",recieved_start);
        console.log("start_week with modification",start_week);
        const create_weekly_planner = await trx('weekly_planner')
            .insert({
                weekly_planner_user_id: WeeklyPlannerData.weekly_planner_user_id,
                weekly_planner_start_date: DateTime.fromJSDate(WeeklyPlannerData.weekly_planner_start_date),
                weekly_planner_end_date: DateTime.fromJSDate(WeeklyPlannerData.weekly_planner_end_date),
                weekly_planner_week_number: WeeklyPlannerData.weekly_planner_week_number
            })
            .returning('*');
        return create_weekly_planner;

    },
    // this methode aim to inster the Weekly_slots_per_category - few categories will be entered, few saves will be done at once,



    SaveWeeklySlotsCategoryData: async (WeeklyCategoryBulkData, trx) => {

        console.log("prepar_bulk_week_slots_insert WeeklyCategoryBulkData", WeeklyCategoryBulkData);
       
        const save_weekly_slots_per_category = await trx('weekly_slots_per_category')
            .insert(WeeklyCategoryBulkData)
            .returning('*');

        
        return save_weekly_slots_per_category;
    }
};



export const checkExisitingUserWeeklyPlanner = async (userId, weekNumber)=>{
    console.log("Check if exisit details tableName, userId, weekNumber", userId, weekNumber);
    try{
        const query = await db.select('*')
        .from('weekly_planner')
        .where({weekly_planner_user_id :userId, weekly_planner_week_number:weekNumber })

        return query.length > 0
    }
    catch(e){
        console.log(e, "eroro in checking exisit");
        throw console.error();
    }
    
                

}