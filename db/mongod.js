const mongoose = require('mongoose')
const express = require('express')
const jwt = require('jsonwebtoken')
const jwtPassword = "3443874783"
const usedbname = 'userdb'
// connect the database

mongoose.connect(`your uri /${usedbname}`)



// object -> data modelling
// this takes care that if i am having only 3 fields and with same data type 
// if this have more feilds then it will remove it
// if any field is missing then it doesnt consider but can save to db

const User = mongoose.model('users',
    {
        name:String,
        email:String,
        password:String
    }
)

// just creates the required type of data for the db
// here it injects the id for db _id field
const p = new User({
    name:'harkirat',
    email:'harkirat6969@gmail.com',
    password:'3333333'
    
})

console.log(p)
// console.log(User)
// actually saves the data to db
p.save()