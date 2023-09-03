import db from "../../data/database.js";
import { dbRequest, checkExisitingUserWeeklyPlanner } from "./utilsDb/weeklyPlannerDbUtils.js";


// getting the data from the req.body - the req body will send data for the 
const ExtractWeeklyPlannerBodyDataRequest =  (data) => {
    console.log("******************************the extracted data ", data);
    // const WeeklyPlannerData = WeeklyPlannerBodyData['WeeklyPlannerData'];
    // const WeeklySlotsData = WeeklyPlannerBodyData['WeeklySlotsData'];
    try {
        if (data === null || typeof data !== 'object' || Array.isArray(data)) {
            throw new Error("invalide req.body in GetReqWeeklyPlannerBodyData")
        };

        return data;

    }
    catch (e) {
        console.log(e, " you have an erro");
    }

}


export const add_weekly_planner_and_slots = async (req, res) => {
    const {user_id} = req.params;
    console.log('userID in params ', user_id);
    const week_planner_data = req.body.WeeklyPlannerData;
    const slots_data = req.body.WeeklySlotsData;
    try {
        const transactions_log = await db.transaction(async (trx) => {

            const extractedDataWeeklyPlanner =  week_planner_data;

            const checkIfExisit = await checkExisitingUserWeeklyPlanner(user_id, week_planner_data.weekly_planner_week_number );
            console.log("checkIfExisit",checkIfExisit);
            if(!checkIfExisit){
                const WeekPlannerInsert = await dbRequest.CreateWeeklyPlanner(extractedDataWeeklyPlanner, trx);
                const planner_id = WeekPlannerInsert[0].weekly_planner_id;
                const extractedDataWeeklySlots = slots_data;
    
                const prepar_bulk_week_slots_insert = extractedDataWeeklySlots.map(slot =>({
                    ...slot, 
                    weekly_slots_per_category_planner_id:planner_id,
                    weekly_slots_per_category_day_time : JSON.stringify(slot.weekly_slots_per_category_day_time)
                })); 
                
                const save_weekly_planner_full = await dbRequest.SaveWeeklySlotsCategoryData(prepar_bulk_week_slots_insert, trx)

                return res.status(201).json({ msg: "Weekly planner added, goodluck "})
            }else{
                return res.status(404).json({ msg: "weeek already created "})
            }
            

        });

            
        

    } catch (error) {
        console.error("Error in add_weekly_planner:", error);
        res.status(500).json({ msg: "An error occurred while adding the weekly planner" });
    }

}


// This function will be be saving to the DB TABLE add_weekly_planner_slots
// it will be called once the user fieled the form for the weekly time sheets.

export const add_weekly_planner_slots = async (req, res) => {
    console.log("enter the save slots week ");
    try {
        const { user_id } = req.params['user_id']
        const {

            weekly_slots_per_category_planner_id,
            weekly_slots_per_category_type,
            weekly_slots_per_category_day_time } = req.body
        console.log("req.body", req.body);
        console.log("req.params", req.params);


        const save_weekly_slots_per_category = await db('weekly_slots_per_category')
            .insert({
                weekly_slots_per_category_planner_id,
                weekly_slots_per_category_type,
                weekly_slots_per_category_day_time
            })
            .returning('*')
        console.log("save_weekly_slots_per_category", save_weekly_slots_per_category);
        if (save_weekly_slots_per_category.length > 0) {
            return res.status(201).json({ msg: "You got it, your weely slots are saved up ", data: save_weekly_slots_per_category })
        } else {
            return res.status(404).json({ msg: "Weekly Slots Not Saved. Check back-end" })

        }
    }
    catch (e) {
        console.log("you have an error in the saving of the weekly slots - back ende");
        res.status(400).json({ msg: "this is internal affaires Problem in the Back End *add_weekly_planner_slots" })
    }


}





// // SLOT SETTING

// export const add_slot = (req, res) => {
//     console.log("in the adding slot ", req.body);
//     const {
//         user_id,
//         title,
//         slot_type,
//         starting_time,
//         end_time,
//         day_of_week,
//         transportation,
//         fixed_slot } = req.body;

//     db('slot')
//         .insert(req.body)
//         .returning('*')
//         .then(rows => {
//             console.log("the rows", rows);
//             res.json(rows)
//         })
//         .catch(e => {
//             console.log(e);
//             res.status(404).json({ msg: "error" })
//         })
// }


// export const slot_detail = async (req, res) => {
//     console.log("req.body", req.body);

//     const { slot_id } = req.params;
//     try {

//         const data = await db('slot')
//             .where('slot_id', '=', slot_id)
//             .select("*");
//         console.log("thedata", data);
//         res.json(data)


//     } catch (e) {

//         console.log("error", e);
//     }
// }