const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const bcrypt = require('bcrypt');
const { db } = require('./data/database.js');
const { client } = require('pg');

dotenv.config()

const app = express();
// app.use(cors());
// THIS IS TO ALLOW REQUEST FROM PORT 
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));

app.use(cookieParser());

// this is a body parser > parse body from req.body 
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT, () => {
    console.log(`on port${process.env.PORT}`);
})
app.set("db", db);




app.get('/', (req, res) => {
    console.log("hola");
})


app.post('/register', (req, res) => {
    let { username, email, password } = req.body
    console.log("le body ", req.body);
    db('users')
        .select('email')
        .where({ email: email })
        .then(rows => {
            if (!rows.length === 0) {
                console.log("email allready ini ");
            } else {
                    console.log("oulallalala");
                    const salt = bcrypt.genSaltSync();
                    const hash = bcrypt.hashSync(password,  salt)
                    password = hash
                    // console.log("user",first_name, last_name, username, email, password, city, dob, created_on, last_login );
                    db('users')
                        // .returning(['first_name', 'last_name', 'username', 'email', 'password', 'city', 'dob', 'created_on', 'last_login'])
                        .insert({
                            username: username,
                            email: email,
                            password: password,
    
                        })
                        .returning('*')
                        .then(rows => {
                            res.json(rows)
                        })
                        .catch(e => {
                            console.log(e);
                            res.status(404).json({ msg: e.messgae })
                        })
                     
                }
                
            })
        .catch(e => {
            console.log(e);
        res.status(404).json({ msg: e.message })
        })

})



app.post('/login', (req, res) => {
    const { email, password, id} = req.body;
   console.log(email, password);

        db('users')
        .where({email:email})
        .select('email','password', 'id', 'username')
        .then(rows => {
            if(rows.length === 0){
                return res.json({msg:'user does not exist'})
              }
              console.log("im here in node server ");
            res.json(rows)  
         })
         .catch(e => {
            console.log(e);
            res.status(404).json({ msg: e.message })
        })
})

// TO DO MORE VERIFICATIO

    // const userData = users.find(user => {
    //     console.log(users);
    //     return user.email == email;
    // })

    // console.log('user_data', userData);

    // const matchTest = bcrypt.compareSync(password, userData.password)

    // if (!matchTest) {
    //     return res.json({ msg: "wrong Password" })
    // }




app.get('/users', (res,req)=>{
    db.select('*')
    .from('users')
    .then(rows =>{
       
        console.log("we sent ", rows)
    }
    )
    .cathc(e=>{
        console.log("oups",e);
        res.status(404).json({ msg: "error" })
    })
})



app.get('/profile/:id', (res,req)=>{
    const id = req.params
    db('users')
    .select('user_id', "=", id)
    .from('users')
    .then(rows =>{
        console.log("got userProfile", rows)
    }
    )
    .cathc(e=>{
        console.log("oups",e);
        res.status(404).json({ msg: "error" })
    })
})


// // CRUD GOAL
// CREAT ONE GOAL
    app.post('/api/goal/', (req, res) => {
        console.log("in the goals list ", req.body);
        const { 
            goal_id,
            user_id,
            title,
            goal_type,
            starting_date,
            end_date,
            goal_status,
            accomplished,
            goal_order
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
    })


// // READ ONE





app.get('/api/goal_detail/:id', (req, res) => {
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
    
})



// // READ ALL GOALS
// app.get('/api/my_goals/:id', (req, res) => {
//     // console.log("icic cest req et toi ",req);
//     const {id} = req.params
//     console.log(id);
//     db('goal')
//         .select('*')
//         .leftOuterJoin('goal_type', 'goal.goal_type', 'goal_type.id')
//         //create  inner join on table type of 
//         .rightJoin('users', 'goal.user_id', 'users.id' )
//         .where({user_id: id})
//         .then(rows => {
//             console.log(rows);
//             if(rows.length === 0) {
//                   res.json({"msg":"null"})
//             }  else{
             
//                 res.json(rows) 
//             }
           
//         })
//         .catch(e => {
//             console.log(e);
//             res.status(404).json({ msg: "error" })
//         })
// })




// READ ALL VISION BOARD
app.get('/api/vision_board/:id', (req, res) => {
    // console.log("icic cest req et toi ",req);
    const {id} = req.params
    console.log(id);
    db('goal')
        .select('*')
        .rightJoin('users', 'goal.user_id', 'users.id' )
        .where({user_id: id})
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
})


// app.delete('/logout', (req, res) => {
//     // clear the user's session and remove the user ID from cookies
//     res.clearCookie('user_id');
//     res.redirect('/');
// });

app.delete('/logout', (req, res) => {
    try {
      // clear the user's session and remove the user ID from cookies
    //   req.session.destroy();
      res.clearCookie('user_id');
  
      // redirect to homepage
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });


// // EDIT GOAL
// // / Update - Put - Update/Modify a product
// app.put('/api/goals/:id', (req, res) => {
//     const { id } = req.params;
//     const { title, goal_type, start_date, end_date, accomplished } = req.body;
//     console.log(req.body);
//     db('goal')
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

// app.delete('/api/goals/:id', (req, res) => {
//     const { id } = req.params;
//     db('goal')
//         .where({ goal_id:id })
//         .del()
//         .returning('*')
//         .then(rows => {
//             res.json(rows)
//         })
//         .catch(e => {
//             res.status(404).json({ msg: 'product not found...' })
//         })

// })



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


// read_goalType
app.get('/api/goal_type/', (req, res) => {
    db('goal_type')
        .select('*')
        .then(row => {
            res.json(row)
        })
        .catch(e => {
            console.log(e);
            res.status(404).json({ msg: "error" })
        })
})


// app.get('/usr' ,( req,res)=>{
    
// })

