import db from '../../data/database.js'


// here is to get slots types 
export const get_slots_types = async (req, res) => {
    console.log("entered the slottype req back end");
    try {
        const slots_types = await db.select('*')
            .from('slot_type')

        if (slots_types.length > 0) {

            return res.status(200).json({ data: slots_types });

        } else {
            return res.status(400).json({ msg: "bad request here in the backEnd slots Types" })

        }


    }
    catch (error) {
        console.log("error in fetching Goals Types ");
    }

};
