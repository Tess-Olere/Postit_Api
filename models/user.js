const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const bloggerSchema = new mongoose.Schema({
    name: {
        type: String,
        minlenght: [6, 'The minimum length for name is 6']
    },
    email: {
        type: String,
        required: [true, 'Please enter a valid email address'],
        unique: true,
        match: [ /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Please provide a valid email address'] 
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlenght: [7, 'The minimum length of password is 7']
    },
},
{timestamps: true}
)

bloggerSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

bloggerSchema.methods.generateToken = function () {
    return jwt.sign({ userId: this._id, name: this.name}, process.env.JWT_SECRET,{expiresIn: '1d'})
}

bloggerSchema.methods.comparePassword = async function (bloggerPassword) {
    const isCorrect = await bcrypt.compare(bloggerPassword, this.password)
    return isCorrect
}

module.exports = mongoose.model('User', bloggerSchema) 