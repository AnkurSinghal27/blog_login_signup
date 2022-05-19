const express = require("express");
const knex = require("./confic/db.js");
const app = express();
const validate = require("./middlewares/validations")

const {authenticationToken, authorizationToken} = require('./auth/security.auth')

app.use(express.json())

app.get('/', authorizationToken, async(req,res)=>{
    try{
        var data= await knex("permission")
        console.log(data);
        res.send(data)
    }catch(err){
        res.send(err.message)
    }
})
app.post('/sign', validate,async(req,res)=>{
    try{
        // check whether the same user exists or not...
        await knex("permission").insert(req.body)
        return res.status(201).send("signup successful")
    }
    catch(err){
        res.send(err.message)
    }
})

app.get('/login',async(req,res)=>{
    try{
       var a= await knex("permission").where({email:req.body.email})
    //    obj={
    //        values:"login successful",
    //        a
    //    }
       if (a.length && req.body.password === a[0].password) {
           const token = authenticationToken(a[0]);
           res.cookie('user_token', token).json({
               values: 'Logged In successfully',
               data: a
           })

       }

    }catch(err){
        res.send(err.message)
    }
})
app.post('/post', authorizationToken,async(req, res)=>{
    const {title, description} = req.body
try{
    console.log(req.user_id)
 await knex("blog").insert({
    title, description, userId:req.user_id
 })
 return res.status(201).send("blog pasted")
}catch(err){
res.send(err.message)
}
})
app.put('/update/:id',authorizationToken,async(req,res)=>{
    
    try{
        await knex("blog").where({id:req.params }).update(req.body)
        res.send("updated")
    }
    catch(err){
        res.send(err.message)
    }
})

const port = 8000
app.listen(port, ()=>{
    console.log("server is running on port ", port)
})