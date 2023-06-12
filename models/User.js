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
userSchema.statics.signup = async function(email, password){
    //validation
    if(!email || !password) throw Error('Fill all fields')
    if(!validator.isEmail(email)) throw Error('incorrect email format')
    if(!validator.isStrongPassword(password)) throw Error('password not strong')
    const exists = await this.findOne({email})
    if(exists) throw Error('email already in use')

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = this.create({email, password: hash})
    return user

}
userSchema.statics.login = async function(email, password){
    if(!email || !password) throw Error('Fill all fields')
    const user = await this.findOne({email})
    if(!user) throw Error('incorrect email')

    const match = bcrypt.compare(password, user.password)
    if(!match) throw Error('incorrect password')

    return user
}
module.exports = mongoose.model('User', userSchema)
