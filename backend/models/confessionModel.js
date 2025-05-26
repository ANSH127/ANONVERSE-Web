
const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    reportedby: {
        type: Array,
        default: []
    },
});

const confessionSchema = new mongoose.Schema({
    comments: {
        type: [commentSchema],
        default: []
    },
    likes: {
        type: Number,
        default: 0
    },
    likedby: {
        type: Array,
        default: []
    },
    reportedby: {
        type: Array,
        default: []
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});


const Confession = mongoose.model('Confession', confessionSchema);

module.exports = Confession;