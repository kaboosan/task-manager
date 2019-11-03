const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
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
    },
    tokens:[{
        token: {
            type: String,
            required: true
        }
    }]
})

//Creation of instance method
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString() }, 'cestunephrasesecrete', { expiresIn:
        '7 days' })

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

userSchema.methods.toJSON = function(){
    const user = this
    const userProfile = user.toObject()

    delete userProfile.password
    delete userProfile.tokens

    return userProfile
}

//Creation of static method
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatched = await bcrypt.compare(password, user.password)

    if(!isMatched){
        throw new Error('Unable to login')
    }

    return user
}

userSchema.pre('save', async function (next) {
    const user= this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})
const User = mongoose.model('User', userSchema)

module.exports = User