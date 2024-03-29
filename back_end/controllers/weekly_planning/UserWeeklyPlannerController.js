import db from '../../data/database.js'




// this Function API will allow the fetching of any weekly data, this will allows to simplify code
// the the API will be called with a week ID 

export const get_user_current_week_data = async (req, res) => {
    
    try {
        const user_id = parseInt(req.params.user_id);
        const week_number = parseInt(req.params.week_number)
        console.log("user_id $week_number",user_id, week_number);

        const getUserWeekData = await db('weekly_planner')
        .join('weekly_slots_per_category', function() {
            this.on('weekly_planner.weekly_planner_user_id', '=', user_id)
                .andOn('weekly_planner.weekly_planner_week_number', '=', week_number )
        })
        .select('*');

        console.log("getUserWeekData BACK IN USER WEEKLY PLANNER CONTROLER ", getUserWeekData);
        if (getUserWeekData.length > 0) {
            console.log("un autre log in the get user data line 25",getUserWeekData);
            res.json(getUserWeekData)
        }
        else {
            res.status(404).json({msg:"You dont have data yet "})
        }
        

    }
    catch (e) {
        console.log("errro in the back ");
        res.status(500).json({msg:"errro fetching user week -backEnd"})
    }

};

