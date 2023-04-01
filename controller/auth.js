const Bloggers = require('../models/user');
const handleErrors = require('../utils/handleErrors')

const signUp = async (req, res) => {
   const {email, name, password} = req.body
 
   try {
    const user = await Bloggers.create({...req.body})
    const token = user.generateToken()
    res.status(200).json({user: {name: user.name, email: user.email}, token })
   } catch (error) {
    const errors = handleErrors(error)
    res.status(400).json({errors })
   }
}

const login = async (req, res) => {
    const {email, password } = req.body
    if(!email || !password) {     
 return  res.status(400).json({ success: false, message: 'Please provide necessary information'})   
    }
     try {
         const user = await Bloggers.findOne({ email })
         if(!user) {
            throw Error('Incorrect Email')
        }
        const authenticated = await user.comparePassword(password)
        if (!authenticated) {
            throw Error('Incorrect Password')
        }
        const token =user.generateToken()
        res.status(200).json({ user: {name: user.name, email: user.email, password: user.password}, token})
    } catch (error) {
        const errors = handleErrors(error)
        res.status(400).json({errors })
     }
}

module.exports = {signUp, login}