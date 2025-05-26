const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: '3d' })
}


const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        let { _id,username,avatar } = user
        res.status(200).json({_id,email, token,username,avatar })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const signupUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.signup(username, email, password);
        const token = createToken(user._id)
        res.status(201).json({ email, token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const updateUserAvatar=async(req,res)=>{
    const {avatar} = req.body
    const userId = req.user._id
    try {
        const user = await User.findByIdAndUpdate(userId, { avatar }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'Avatar updated successfully', user });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }

    
}






module.exports = {
    loginUser,
    signupUser,
    updateUserAvatar
}