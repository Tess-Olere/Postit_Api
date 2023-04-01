const mongoose = require('mongoose')

const storiesSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a blogger identifier']
    },
},
 {timestamps: true}
)
module.exports = mongoose.model('Story', storiesSchema)