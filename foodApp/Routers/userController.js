const express = require('express');

const app = express();

const userModel = require('../mongo.js');
const userRouter = express.Router();

userRouter.route('/').get(getUser).post(postUser).patch(updateUser).delete(deleteUser);

async function getUser(req, res)
{
    let users = userModel.find();

    res.json(
        {
            message:'All users',
            data: users
        }
    );
}

async function postUser(req, res)
{
    let dataToAdd = req.body;

    let users = userModel.create(dataToAdd);

    res.json({
        message: 'User being Created'
    })
}

async function deleteUser(req, res)
{
    let data = userModel.findOneAndDelete({email:req.body.email});

    res.json(
        {
            message:"deleted successfully",
            user:data
        }
    )
}

async function updateUser(req, res)
{
    let user = userModel.findOneAndUpdate({email:req.body.email}, req.body);

    res.json(
        {
            message:'Updated user successfully'
        }
    )
}

