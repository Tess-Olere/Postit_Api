require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const cors = require('cors')
const notFound = require('./middleware/notFound')
const authRouter = require('./routes/authRouter')
const blogRouter = require('./routes/blogRouter')
const allRouter = require('./routes/allrouter')

const auth = require('./middleware/authentication')
const cloudinary= require('cloudinary').v2
mongoose.set('strictQuery', true);
const fileUpload = require('express-fileupload')

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.cloud_api_key,
    api_secret: process.env.cloud_api_secret,
})
// middleware
app.use(cors())
app.use(fileUpload({useTempFiles: true}))
app.use(express.json())

app.use("/api/v1", authRouter)
app.use('/api/v1/blog', auth, blogRouter)
app.use('/api/v1/allblog', auth, allRouter)
app.get('/api/v1/user', auth, (req,res) => {
    res.status(200).json({success: true, name: req.user.name})
})

// error routes
app.use(notFound)

const start = async () => {
    try {
    await mongoose.connect(process.env.MONGO_URI)
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}...`);   
    })
} catch (error) {
    console.log(error);
}
}
start();