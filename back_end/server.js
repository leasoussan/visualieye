// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const axios = require('axios');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const bcrypt = require('bcrypt');
// const { db } = require('./data/database.js');
// const { client } = require('pg');
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import db from './data/database.js';
import goal_router from './router/goalRouter.js';
import planning_router from './router/planingRouter.js';
// import { fileURLToPath } from 'url';
// import path from 'path';
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


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(express.static(__dirname + '/public'));

app.use(goal_router);
app.use(planning_router);


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
