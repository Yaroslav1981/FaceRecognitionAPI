const fs = require('fs');
const express = require('express');
const {handleRegister} = require('./controllers/register');
const {handleSingin} = require('./controllers/singin');
const {handleEntries} = require('./controllers/entries');

const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex')({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'postgres',
      password: 'test',
      database: 'smart-brain',
    },
  });

const app = express();


app.use(express.json());
app.use(cors());


app.get('/', function (req, res){
    res.send(database.users)
})
app.post('/singin', (res, req)=>{handleSingin(res,req, knex, bcrypt)})

app.post('/register', (res, req)=>{handleRegister(res,req, knex, bcrypt)});

// app.get ('/profile/:id', function (req, res){
//     const {id} = req.params;
//     let flag = false;
//     database.users.forEach(user=>{
//         if(user.id === +id){
//             flag = true;
//             return res.json(user);
//         }
//     })
//     if(!flag)res.status(404).json("Eror 404");
// })

app.put ('/image', (res, req)=>{handleEntries(res, req, knex)})


app.listen(process.env.PORT || 8080,()=>{
 })