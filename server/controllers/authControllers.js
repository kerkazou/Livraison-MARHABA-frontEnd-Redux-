const db = require('../models');
const jwt = require('jsonwebtoken');
var storage = require('local-storage');
const mailer = require('../middlewares/mailer');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

// Create Main Model
const User = db.user;
const Role = db.role;

const login = async (req, res) => {
    const {body} = req
    if(!body.email || !body.password) throw Error('Fill the all fields to login')
    const login_user = await User.findOne({email: body.email})
    if(!login_user || !(await bcrypt.compare(body.password, login_user.password))) throw Error('Email or password is incorect')
    if(!login_user.verification) throw Error('Check your email to active your account')
    const login_role = await Role.findById(login_user.roles)
    const token = await jwt.sign({_id: login_user._id}, process.env.TOKEN_KEY)
    storage('token', token)
    res.json({role: login_role.name, username: login_user.username, token: storage('token')})
}

const register = async (req, res) => {
    const {body} = req
    if(!body.username || !body.email || !body.password || body.password != body.cofirm_password)
        throw Error('Fill the all fields to register')
    const findEmail = await User.findOne({email: body.email})
    if(findEmail) throw Error('Email already exist')
    const hash = await bcrypt.hash(body.password, saltRounds);
    const user = await User.create({
        ...body, password: hash, roles: '637de58c1c73d7e2ef657a45', verification: false
    })
    if(user) {
        mailer.main('verify-email',body.email)
        res.json({message: 'Successfully, Check your email to active your account', email: body.email, password: body.password})
    }
    if(!user) throw Error('User not created try again')
}

const verifyEmail = async (req, res) => {
    const verify_email = await jwt.verify(req.params.token, process.env.TOKEN_KEY)
    const verify_user = await User.findOne({email: verify_email.email})
    if(verify_user.verification == true) 
        res.redirect('http://localhost:3000/login')
        // throw Error('Your account is already actived')
    const verification_email = await User.updateOne({email: verify_email.email}, {$set: {verification: true}})
    if(verification_email) res.redirect('http://localhost:3000/login')
    if(!verification_email) throw Error("You can't to active your account")
}

const logout = async (req, res) => {
    storage.clear();
    res.send('You are logout')
}

module.exports = {
    login,
    register,
    verifyEmail,
    logout
}