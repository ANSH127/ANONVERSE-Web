const Confession = require('../models/confessionModel');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const cloudinary=require('../config/cloudinary');
const fs=require('fs');



// get confwssion

const getAllConfessionsWithRange = async (req, res) => {
    try {
        let {start=0,end=5} = req.query;
        start = parseInt(start);
        end = parseInt(end);
        const limit = end - start;
        const confessions = await Confession.find().populate('uid','avatar').sort({ createdAt: -1 }).skip(start).limit(limit);
        
        res.status(200).json(confessions);

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}


// get user confession

const getUserConfessions = async (req, res) => {
    try {
        let {start=0,end=5} = req.query;
        start = parseInt(start);
        end = parseInt(end);
        const limit = end - start;

        const confessions = await Confession.find({ uid: req.user._id }).populate('uid','avatar').sort({ createdAt: -1 }).skip(start).limit(limit);
        
        res.status(200).json(confessions);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

// get confession by id

const getConfessionById = async (req, res) => {
    const id = req.params.id;
    try {
        const confession = await Confession.find({uid: id}).populate('uid','avatar');
        res.status(200).json(confession.filter((confession) => confession.name !== "Anonymous"));
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// add confession

const addConfession = async (req, res) => {
    let { name, description, comments, likes, likedby, reportedby } = req.body;
    let emptyfields = [];
    if (!name) {
        emptyfields.push("name");
    }
    if (!description) {
        emptyfields.push("description");
    }

    if (emptyfields.length > 0) {
        return res.status(400).json({ message: `please fill in the following fields: ${emptyfields.join(", ")}` });
    }
    let updatedname=name;
    if(name!=="Anonymous"){
        const user= await User.findById(req.user._id);
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        updatedname=user.username;
    }
    // Parse arrays if sent as JSON strings
    comments = comments ? JSON.parse(comments) : [];
    likedby = likedby ? JSON.parse(likedby) : [];
    reportedby = reportedby ? JSON.parse(reportedby) : [];

    let imageUrl = '';
    if (req.file) {
        try {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'confessions'
            });
            imageUrl = result.secure_url;
            // Remove temp file
            fs.unlinkSync(req.file.path);
        } catch (err) {
            return res.status(500).json({ message: "Image upload failed" });
        }
    }

    const newConfession = new Confession({
        name: updatedname,
        description,
        comments,
        likes,
        likedby,
        reportedby,
        image: imageUrl,
        createdAt: new Date(),
        uid: req.user._id
    });
    try {
        await newConfession.save();
        res.status(201).json({ message: "Confession added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

// delete confession

const deleteConfession = async (req, res) => {
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid confession id");
        const confession = await Confession.findById(id);
        if (!confession) throw new Error("Confession not found");

        if (confession.uid.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this confession" });
        }


        await Confession.findByIdAndDelete(id);
        res.status(200).json({ message: "Confession deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// fetch user

const getUserDetails = async (req, res) => {

    try {
        const user = await User.findById(req.user._id);
        res.status(200).json(user);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// fetch userdetails by id

const getUserDetailsById = async (req, res) => {
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid user id");
        const user = await User.findById(id);
        if (!user) throw new Error("User not found");
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// update likes

const updateLikes = async (req, res) => {
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid confession id");
        const confession = await Confession.findById(id);
        if (!confession) throw new Error("Confession not found");

        if (confession.likedby.includes(req.user._id)) {
            // remove like
            const updatedConfession = await Confession.findByIdAndUpdate(id, { likes: confession.likes - 1, $pull: { likedby: req.user._id } }, { new: true });
            return res.status(200).json(updatedConfession);

        }
        else {

            const updatedConfession = await Confession.findByIdAndUpdate(id, { likes: confession.likes + 1, $push: { likedby: req.user._id } }, { new: true });
            res.status(200).json(updatedConfession);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


/// add comment

const addComment = async (req, res) => {
    const id = req.params.id;
    const { comment } = req.body;
    
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid confession id");
        const confession = await Confession.findById(id);
        if (!confession) throw new Error("Confession not found");
        const updatedConfession = await Confession.findByIdAndUpdate(id, { comments: [...confession.comments, { comment, uid: req.user._id }] }, { new: true });
       // send the newly added only comment
       res.status(200).json(updatedConfession.comments[updatedConfession.comments.length - 1]);


    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: error.message });
    }
}



// delete comment
const deleteComment = async (req, res) => {
    const confessionId = req.params.confessionId;
    const commentId = req.params.commentId;

    try {
        if (!mongoose.Types.ObjectId.isValid(confessionId)) throw new Error("Invalid confession id");
        const confession = await Confession.findById(confessionId);
        if (!confession) throw new Error("Confession not found");

        const updatedComments = confession.comments.filter(comment => comment._id.toString() !== commentId);

        if (updatedComments.length === confession.comments.length) {
            return res.status(404).json({ message: "Comment not found" });
        }

        const updatedConfession = await Confession.findByIdAndUpdate(confessionId, { comments: updatedComments }, { new: true });
        res.status(200).json(updatedConfession);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// report comment
const reportComment = async (req, res) => {
    const confessionId = req.params.confessionId;
    const commentId = req.params.commentId;

    try {
        if (!mongoose.Types.ObjectId.isValid(confessionId)) throw new Error("Invalid confession id");
        const confession = await Confession.findById(confessionId);
        if (!confession) throw new Error("Confession not found");

        const comment = confession.comments.find(comment => comment._id.toString() === commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        if (comment.reportedby.includes(req.user._id)) {
            return res.status(400).json({ message: "You have already reported this comment" });
        }

        comment.reportedby.push(req.user._id);
        await confession.save();
        res.status(200).json({ message: "Comment reported successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const fetchTrendingConfessions = async (req, res) => {
    try {
        const confessions = await Confession.find().populate('uid','avatar').sort({ likes: -1 }).limit(5);
        res.status(200).json(confessions);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

// fetch All Users

const fetchAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}


// report confession

const reportConfession = async (req, res) => {
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid confession id");
        const confession = await Confession.findById(id);
        if (!confession) throw new Error("Confession not found");

        if (confession.reportedby.includes(req.user._id)) {
            return res.status(400).json({ message: "You have already reported this confession" });

        }
        else {
            const updatedConfession = await Confession.findByIdAndUpdate(id, { $push: { reportedby: req.user._id } }, { new: true });
            res.status(200).json(updatedConfession);
        }





    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}


module.exports = {
    getAllConfessionsWithRange,
    addConfession,
    deleteConfession,
    getUserConfessions,
    getUserDetails,
    updateLikes,
    addComment,
    fetchTrendingConfessions,
    fetchAllUsers,
    reportConfession,
    getUserDetailsById,
    getConfessionById,
    deleteComment,
    reportComment
}