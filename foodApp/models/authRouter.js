const express = require('express');

const authRouter = express.Router();

const userModel = require('../mongo');

authRouter.route('/signUp').get(middleWare, getSignUp).post(postSignUp);

function getSignUp(req, res)
{
    
}