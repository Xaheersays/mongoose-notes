const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const jwtPassword = 'maintosafehoo🫡'
mongoose.connect('mongodb+srv://<username>:<password>@cluster0.jgq64hk.mongodb.net/')
const app  = express()

const User = mongoose.model('user',{
    name:String,
    username:String,
    password :String

})

app.use(express.json())

async function userExists(username,password){

    try {
        let user = await User.findOne({ username: username, password: password 
        });
    
        if (user) {
            console.log('User found:', user);
            return true
        } else {
            console.log('User not found');
        }
    } catch (error) {
        console.error('Error finding user:', error);
    }
    return false


    

}

app.post('/adduser',async(req,res)=>{
    const {name,username,password} = req.body
    const p =  new User({
        name:name,
        username:username,
        password :password
    })
    p.save()
        .then(()=>{
            console.log('user saved')
            return res.status(200).send('user saved sxxfly')
        })
        .catch(error=>{
            console.log(error)
            return res.send(403).send('user cant be saved')
        })


})      


app.post("/signin",async(req,res)=>{
    const username= req.body.username
    const password =req.body.password
    const result = await userExists(username,password)
    if(!result){
        return res.status(403).json({
            msg:"user does'nt expist in our database"
        })
    }

    var token = jwt.sign({username:username},jwtPassword)
    return res.json({tkn:token})

})

async function getUsers(){  
    try{
        const users  =await User.find({})
        return users
    }
    catch(err){
        return []
    }

}

app.get("/users",async (req,res)=>{
    const token = req.headers.authorization
    // console.log(token)
    try{
        console.log("getting users")
        const decoded = jwt.verify(token,jwtPassword)
        console.log(decoded)
        const username = decoded.username
        const  users = await getUsers()
        res.status(200).send(users)

    }
    catch(err){
        return res.status(403).json({
            msg:'Invalid Token'
        })
    }
})

app.listen(3000)