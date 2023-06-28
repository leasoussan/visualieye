import db from '../data/database.js'

// // CRUD GOAL
// app.post('/api/goal/', )

// CREAT ONE GOAL
export const add_goal = (req, res) => {
    console.log("in the add goal ", req.body);
    const { 
        user_id,
        title,
        goal_type,
        starting_date,
        end_date,
     } = req.body;
    db('goal')
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



// // READ ONE

// app.get('/api/goal_detail/:id', )


export const goal_detail = (req, res) => {
    const { id } = req.params;
    console.log("in the parama id", id);
    
    try{
        db('goal')
        .select('*')
        .where('goal_id', '=', id)
        .then(rows => {
            console.log("here yo");
            if (rows.length === 0) {
                return res.status(404).json({ msg: 'not found' })
            }else{
                console.log("in the goalId", rows );
                res.json(rows)
            }
        })
        .catch(e => {
            console.log(e);
            res.status(404).json({ msg: e.message })
        })
    }
    catch(err){
        return res.status(404).json({msg:'not found'})
    }
    
    }





// // READ ALL GOALS
// app.get('/api/my_goals/:id', )

export const profiler = (req, res) => {
    // console.log("icic cest req et toi ",req);
    const {user_id} = req.params
    console.log(user_id);
    db('goal')
        .select('*')
        .leftOuterJoin('goal_type', 'goal.goal_type', 'goal_type.id')
        //create  inner join on table type of 
        .rightJoin('users', 'goal.user_id', 'users.id' )
        .where({user_id: user_id})
        .then(rows => {
            console.log(rows);
            if(rows.length === 0) {
                  res.json({"msg":"null"})
            }  else{
             
                res.json(rows) 
            }
           
        })
        .catch(e => {
            console.log(e);
            res.status(404).json({ msg: "error" })
        })
    }



// EDIT GOAL
// / Update - Put - Update/Modify a product
// app.put('/api/goals/:id', )

export const edit_goal =(req, res) => {
    const { id } = req.params;
    const { title, goal_type, start_date, end_date, accomplished } = req.body;
    console.log(req.body);
    db('goal')
        .where({ id })
        .update(req.body)
        .returning('*')
        .then(rows => {
            res.json(rows)
        })
        .catch(e => {
            console.log(e);
            res.status(404).json({ msg: e.messgae })
        })


}


// app.delete('/api/goals/:id', )

export const delete_goal = (req, res) => {
    const { id } = req.params;
    db('goal')
        .where({ goal_id:id })
        .del()
        .returning('*')
        .then(rows => {
            res.json(rows)
        })
        .catch(e => {
            res.status(404).json({ msg: 'product not found...' })
        })

}


// // READ ALL VISION BOARD
// app.get('/api/vision_board/:id', (req, res) => {
// // console.log("icic cest req et toi ",req);
// const {id} = req.params
// console.log(id);
// db('goal')
//     .select('*')
//     .rightJoin('users', 'goal.user_id', 'users.id' )
//     .where({user_id: id})
//     .then(rows => {
//         console.log(rows);
//         if(rows.length === 0) {
//               res.json({"msg":"null"})
//         }  else{
         
//             res.json(rows) 
//         }
       
//     })
//     .catch(e => {
//         console.log(e);
//         res.status(404).json({ msg: "error" })
//     })
// })


// app.delete('/logout', (req, res) => {
//     // clear the user's session and remove the user ID from cookies
//     res.clearCookie('user_id');
//     res.redirect('/');
// });








// app.get('/api/goals_board/:id', (req, res) => {
//     const { id } = req.params;
//     db('user_goal')
//         .where({ id })
//         .returning('*')
//         .then(data => {
//             res.json(data)
//         })
//         .catch(e => {
//             res.status(404).json({ msg: 'goals not found...' })

//         })
// })



// // CRUD step
// // CREAT ONE step
// app.post('/api/goal_steps', (req, res) => {

//     const { title, goal_id, action_type, accomplished, affirmation, instructions, time_needed } = req.body;
//     db('goals_steps')
//         .insert({
//             title: title,
//             goal_id: goal_id,
//             action_type: action_type,
//             accomplished: accomplished,
//             affirmation: affirmation,
//             instructions: instructions,
//             time_needed: time_needed
//         })
//         .returning('*')
//         .then(rows => {
//             res.json(rows)
//         })
//         .catch(e => {
//             console.log(e);
//             res.status(404).json({ msg: "error" })
//         })
// })


// // READ ONE step

// app.get('/api/goal_steps/:id', (req, res) => {

//     const { id } = req.params;
//     db('goals_steps')
//         .select('*')
//         .where({ id })
//         .then(rows => {
//             if (rows.length === 0) {
//                 return res.status(404).json({ msg: 'not found' })
//             }
//             res.json(rows)
//         })
//         .catch(e => {
//             console.log(e);
//             res.status(404).json({ msg: e.messgae })
//         })
// })
// // READ ALL step
// app.get('/api/goal_steps/', (req, res) => {
//     console.log("aqui");
//     db('goals_steps')
//         .select('*')
//         .then(rows => {
//             if (rows.length === 0) {
//                 res.status(404).json({ msg: "not int he list " })
//             }
//             res.json(rows)
//         })
//         .catch(e => {
//             console.log(e);
//             res.status(404).json({ msg: "error" })
//         })
// })


// // EDIT step
// // / Update - Put - Update/Modify a product
// app.put('/api/goal_step/:id', (req, res) => {
//     const { id } = req.params;
//     const { title, goal_id, action_type, accomplished, affirmation, instructions, time_needed } = req.body;

//     db('goals_steps')
//         .where({ id })
//         .update(req.body)
//         .returning('*')
//         .then(rows => {
//             res.json(rows)
//         })
//         .catch(e => {
//             console.log(e);
//             res.status(404).json({ msg: e.messgae })
//         })


// })

// app.delete('/api/goal/step/:id', (req, res) => {
//     const { id } = req.params;
//     db('goals_steps')
//         .where({ id })
//         .del()
//         .returning('*')
//         .then(rows => {
//             res.json(rows)
//         })
//         .catch(e => {
//             res.status(404).json({ msg: 'product not found...' })
//         })

// })



export const goal_type = (req, res) => {
db('goal_type')
    .select('*')
    .then(row => {
        res.json(row)
    })
    .catch(e => {
        console.log(e);
        res.status(404).json({ msg: "error" })
    })
}
