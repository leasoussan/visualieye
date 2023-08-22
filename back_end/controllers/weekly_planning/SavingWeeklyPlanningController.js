import db from '../../data/database.js'


// this methode aim to insert Data into DB - plain query insertion and returning the created object 
const dbRequest = {
    CreateWeeklyPlanner: async (WeeklyPlannerData) => {
        const create_weekly_planner = await db('weekly_planner')
            .insert({
                weekly_planner_user_id: WeeklyPlannerData.weekly_planner_user_id,
                weekly_planner_start_date: WeeklyPlannerData.weekly_planner_start_date,
                weekly_planner_end_date: WeeklyPlannerData.weekly_planner_end_date,
                weekly_planner_is_current_week: WeeklyPlannerData.weekly_planner_is_current_week,
                weekly_planner_week_number: WeeklyPlannerData.weekly_planner_week_number
            })
            .returning('*');
        return create_weekly_planner;

    },
    // this methode aim to inster the Weekly_slots_per_category - few categories will be entered, few saves will be done at once,

    SaveWeeklySlotsCategoryData: async (WeeklyCategoryData, planner_id, trx) => {
        console.log("WeeklyCategoryData 22 line", WeeklyCategoryData);
        console.log("planner_id oulalalallal ", planner_id);
        const save_weekly_slots_per_category = await db('weekly_slots_per_category')
            .insert({
                weekly_slots_per_category_planner_id: planner_id,
                weekly_slots_per_category_type: WeeklyCategoryData.weekly_slots_per_category_type,
                weekly_slots_per_category_day_time: WeeklyCategoryData.weekly_slots_per_category_day_time
            })
            .returning('*');

      

        return save_weekly_slots_per_category;
    }
};


// getting the data from the req.body - the req body will send data for the 
const ExtractWeeklyPlannerBodyDataRequest = async (WeeklyPlannerBodyData) => {

    console.log("lign 37  step START", WeeklyPlannerBodyData);


    const WeeklyPlannerData = WeeklyPlannerBodyData['WeeklyPlannerData'];
    const WeeklySlotsData = WeeklyPlannerBodyData['WeeklySlotsData'];

    console.log("lign 38  step one", WeeklyPlannerData);
    console.log("lign 39  step two", WeeklySlotsData);

    try {

        if (WeeklyPlannerBodyData === null || typeof WeeklyPlannerBodyData !== 'object' || Array.isArray(WeeklyPlannerBodyData)) {
            throw new Error("invalide req.body in GetReqWeeklyPlannerBodyData")
        };

        // const checkDatesValidy = ()=>{

        //     const weekStartDate = weeklyPlannerData.weekly_planner_end_date;
        //     const WeekEndDate = weeklyPlannerData.weekly_planner_end_date;
        //     if (WeekEndDate < weekStartDate){
        //         throw new Error("invalide Week dates")
        //     }    

        // };checkDatesValidy();
        console.log(" lign 57  deconstruc**********", WeeklyPlannerData);
        const {
            weekly_planner_user_id = WeeklyPlannerData.weekly_planner_user_id,
            weekly_planner_start_date = WeeklyPlannerData.weekly_planner_start_date,
            weekly_planner_end_date = WeeklyPlannerData.weekly_planner_end_date,
            weekly_planner_is_current_week = WeeklyPlannerData.weekly_planner_is_current_week,
            weekly_planner_week_number = WeeklyPlannerData.weekly_planner_week_number
        } = WeeklyPlannerData;
        console.log(" lign 65 ___________before return of both ", WeeklyPlannerData);
        // console.dir(WeeklySlotsData, { depth: null });
        return { WeeklyPlannerData, WeeklySlotsData };


    }
    catch (e) {
        console.log(e, " you have an erro");
    }

}


const saveAllSlotsCategories = async (slots_category , trx)=>{
    const promises = slots_category.map((slot, index)=>{
        console.log(slot, index);
    })

}


export const add_weekly_planner_and_slots = async (req, res) => {
    console.log("BODY------------- lign 81-------------**", req.body);
    const user_id = req.params['user_id']
    const week_planner_data = req.body.WeeklyPlannerData;
    const slots_data = req.body.WeeklySlotsData;
    console.log("slots_data _____________________-- lign 85", slots_data);
    // console.log("week_planner_slots_body lign 86", week_planner_slots_body);
    try {
        const transactions_log = await db.transaction(async (trx) => {

            const extractedDataWeeklyPlanner = await ExtractWeeklyPlannerBodyDataRequest(req.body);

            const WeekPlannerInsert = await dbRequest.CreateWeeklyPlanner(extractedDataWeeklyPlanner.WeeklyPlannerData, trx);
            const planner_id = WeekPlannerInsert[0].weekly_planner_id;
            const extractedDataWeeklySlots = await ExtractWeeklyPlannerBodyDataRequest(req.body);

            
            const save_weekly_planner_full = await dbRequest.SaveWeeklySlotsCategoryData(slots_data, planner_id)
            console.log("slots_data yoy save_weekly_planner_full   105 oyoyo", save_weekly_planner_full);

        });



        console.log("in the last else");
        // const saving_weekly_planner = await db.CreateWeeklyPlanner()

        // if (saving_weekly_planner.length > 0) {
        //     return res.status(201).json({ msg: "Weekly planner added, goodluck ", data: saving_weekly_planner[0] })
        // }
        // else {
        //     console.log("Please check your saving");
        //     return res.status(500).json({ msg: "Failed to save the weekly planner" });
        // }

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





// SLOT SETTING

export const add_slot = (req, res) => {
    console.log("in the adding slot ", req.body);
    const {
        user_id,
        title,
        slot_type,
        starting_time,
        end_time,
        day_of_week,
        transportation,
        fixed_slot } = req.body;

    db('slot')
        .insert(req.body)
        .returning('*')
        .then(rows => {
            console.log("the rows", rows);
            res.json(rows)
        })
        .catch(e => {
            console.log(e);
            res.status(404).json({ msg: "error" })
        })
}


export const slot_detail = async (req, res) => {
    console.log("req.body", req.body);

    const { slot_id } = req.params;
    try {

        const data = await db('slot')
            .where('slot_id', '=', slot_id)
            .select("*");
        console.log("thedata", data);
        res.json(data)


    } catch (e) {

        console.log("error", e);
    }
}