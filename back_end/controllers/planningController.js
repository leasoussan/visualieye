import db from '../data/database.js'

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
        fixed_slot     } = req.body;
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

