import db from '../data/database.js'



// this function will save to TABLE add_weekly
//  when a User file up the Weekly Planner FORM with all categories. 

export const add_weekly_planner = async (req, res) => {
    console.log("params", req.params);
    const user_id = req.params['user_id']
    console.log("setting PLanner");
    try {
        const {
            weekly_planner_user_id,
            weekly_planner_start_date,
            weekly_planner_end_date,
            weekly_planner_is_current_week } = req.body;


        // validation input data
        if (!weekly_planner_start_date || !weekly_planner_end_date) {
            console.log("error first condition",);
            return res.status(400).json({ msg: "Invalid Input" })
        }


        console.log("in the last else");
        const saving_weekly_planner = await db('weekly_planner')
            .insert({
                weekly_planner_user_id,
                weekly_planner_start_date,
                weekly_planner_end_date,
                weekly_planner_is_current_week
            })
            .returning('*')

        if (saving_weekly_planner.length > 0) {
            return res.status(201).json({ msg: "Weekly planner added, goodluck ", data: saving_weekly_planner[0] })
        }
        else {
            console.log("Please check your saving");
            return res.status(500).json({ msg: "Failed to save the weekly planner" });
        }

    } catch (error) {
        console.error("Error in add_weekly_planner:", error);
        res.status(500).json({ msg: "An error occurred while adding the weekly planner" });
    }

}


// This function will be be saving to the DB TABLE add_weekly_planner_slots
// it will be called once the user fieled the form for the weekly time sheets.

export const add_weekly_planner_slots = async (req, res) => {

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

        if (save_weekly_slots_per_category.length === 0) {
            return res.status(404).json({ msg: "Weekly Slots Not Saved. Check back-end" })
        } else {
            return res.status(201).json({ msg: "You got it, your weely slots are saved up ", data: save_weekly_slots_per_category })
        }
    }
    catch (e) {
        console.log("you have an error in the saving of the weekly slots - back ende");
        res.status(400).json({ msg: "this is internal affaires Problem in the Back End *add_weekly_planner_slots" })
    }


}


// here is to get slots types 
export const get_slots_types = async (req, res) => {

    try {
        const slots_types = await db.select('*')
            .from('slot_type')

        if (slots_types.length > 0) {
            console.log("slots_types", slots_types);

            return res.status(200).json({ msg: "you got htem all ", data: slots_types });

        } else {
            return res.status(400).json({ msg: "bad request here in the backEnd slots Types" })

        }


    }
    catch (error) {
        console.log("error in fetching Goals Types ");
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