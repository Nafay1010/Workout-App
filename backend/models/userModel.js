const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})

//static signup method
userSchema.statics.signup = async function(email, password){
    //validation
    if(!email || !password)
    throw Error('All fields must be filled!')

    if(!validator.isEmail(email))
    throw Error('Email NOT Valid!')

    if(!validator.isStrongPassword(password))
    throw Error('Note: Password must contain: A Capital, Numeric & Special Characters')

    const exist = await this.findOne({email})

    if(exist)
    throw Error('Email already Exists!')

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password:hash})
    return user
}


//static login method
userSchema.statics.login = async function(email, password){
    
    if(!email || !password)
        throw Error('All fields must be filled!')
    
    const user = await this.findOne({email})

    if(!user)
        throw Error('Email Incorrect')
    
    const match = await bcrypt.compare(password, user.password)

    if(!match)
        throw Error('Password Incorrrect')

    return user
}
module.exports = mongoose.model('User', userSchema)