import db from '../data/database.js'


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