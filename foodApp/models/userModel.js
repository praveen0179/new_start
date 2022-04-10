const url = 'mongodb+srv://user_31:N69OQzrpgctyr9E0@cluster0.jsm79.mongodb.net/thisShit?retryWrites=true&w=majority';

const emailValidate = require('email-validator');

const mongo = require('mongoose');

const bcrypt = require("bcrypt");

const userSchema = mongo.Schema(
    {
        name:{
            type:String,
            required: true
        },
        email:{
            type:String,
            required: true,
            unique: true,
            validate: function()
            {
                return emailValidate.validate(this.email);
            }
        },
        password:{
            type:String,
            required:true,
            min: 8
        },
        confirm_password:{
            type:String,
            required:true,
            min:8,
            validate: function()
            {
                return this.password == this.confirm_password;
            }
        }
    }
);

mongo.connect(url).then(
    (db)=>{
        console.log("Connected To the DataBase");
    }
).catch(function(err)
{
    console.log(err.message);
});

userSchema.pre('save', function()
{
    this.confirm_password = undefined;
});

userSchema.pre('save', async function()
{
    let salt = await bcrypt.genSalt();

    let hashed = await bcrypt.hash(this.password, salt);

    this.password = hashed;
    
    console.log(hashed);
});

const userModel = userSchema.model('userModel', userSchema);

//userSchema generates this 

module.exports = userModel;
