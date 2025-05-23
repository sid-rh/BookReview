const jwt = require('jsonwebtoken');
const User = require('../models/User');

//util function for getting signed token
const signToken = (id) =>{
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

const signup=async(req,res)=>{
    const { name,email, password } = req.body;

    const userExists = await User.findOne({ email });
    
    //if the user already exists
    if (userExists) {
      return res.status(400).json({
        error: 'Email already registered'
      });
    }
    const user = await User.create({
      name,
      email,
      password
    });
    const token = signToken(user._id);
    res.status(201).json({ token });
}

const login=async (req, res) => {
  const { email, password } = req.body;
   const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        error: 'Invalid credentials'
      });
    }
   const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        error: 'Invalid credentials'
      });
    }
  const token = signToken(user._id);
  res.json({ token });
};


module.exports={signup,login};
  