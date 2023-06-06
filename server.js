const express= require('express');
const bodyparser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const register=require('./controllers/Register');
const signin= require('./controllers/Signin');
const Imgcount=require('./controllers/Imgcount');
const knex = require('knex')({
  client: 'pg',
  connection: 
  {
        host : '127.0.0.1',
        port:5432,
        user : 'postgres',
        password : 'test',
        database : 'smartbrain'
      }
});
// knex.select('*').from('users').then(data=>{
//     console.log(data);
// }).catch(error => {
//     if(error) { console.log(error);
// }});{
//     host : '127.0.0.1',
//     port:5432,
//     user : 'postgres',
//     password : 'test',
//     database : 'smartbrain'
//   }
const app=express();
const db={
    users:[
        {
            id:"1",
            name:"kaung",
            email:"kaunghtetmon@gmail.com",
            entries:0,
            pw:"kaunghtetmon"
        }
    ]
    
}
const tdb={};
const f=async ()=>{
    const res=await fetch('/db.json');
    const data=await res.json();
    console.log(data);
}
app.use(bodyparser.json())
app.use(cors());
app.get('/',(req,res)=>{
    res.send(db.users);
})
app.post('/signin',(req,res)=>{signin.SigninHandler(req,res,knex,bcrypt)})
app.post('/register',(req,res)=>{register.HandleRegister(req,res,knex,bcrypt)})
app.get('/profile/:id',(req,res)=>{
    const {id} = req.params;
    let status=false;
    knex.select('*').from('users').where({id}).then(
        users=>
    {   if(users.length){
            res.json(users);
        }else{
            res.json("not found");
        }
    }
    )
    .catch(err=>{
        res.json("error");
    })
    // db.users.forEach(users=>{
    //     if(users.id===id){
    //         status=true;
    //         return res.json(users);
    //     }
    // })
    // if(!status){
    //     res.json('no such user found');
    // }

})
app.put('/image',(req,res)=>{
    Imgcount.Imgcounter(req,res,knex)
})
app.listen(3000,()=>{
    console.log('')
})