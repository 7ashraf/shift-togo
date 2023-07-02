const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    
})

userSchema.statics.signup = async function(firstName, lastName, email, password){
    //validation
    if(!email || !password) throw Error('Fill all fields')
    if(!validator.isEmail(email)) throw Error('incorrect email format')
    //if(!validator.isStrongPassword(password)) throw Error('password not strong')
    const exists = await this.findOne({email})
    if(exists) throw Error('email already in use')

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = this.create({firstName, lastName, email, password: hash})
    return user

}
userSchema.statics.login = async function(email, password){
    if(!email || !password) throw Error('Fill all fields')
    console.log(email, password)
    const user = await this.findOne({email})
    if(!user) throw new Error('incorrect email')
    console.log(`user : ${user}`)


    const match = await bcrypt.compare(password, user.password)
    console.log(match)
    if(!match)
    {
        console.log('didnt match')
        throw new Error('incorrect password')
        
    }else {
        console.log(`${password}, ${user.password} password match`)
    }
    

    return user
}
module.exports = mongoose.model('User', userSchema)
