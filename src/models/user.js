const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User',{
    name:{
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if (value < 0) {
                throw new Error('Age must be greater than zero')
            }
        }
    },
    password:{
        type: String,
        trim: true,
        minlength: 7,
        required: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Please do not include password')
            }
        }
    }
})

module.exports = User