const mongo = require('mongoose');

const emailValidator = require('email-validator');

const bcrypt = require('bcrypt');

const url = 'mongodb+srv://user_31:N69OQzrpgctyr9E0@cluster0.jsm79.mongodb.net/thisShit?retryWrites=true&w=majority';

const link = "mongodb://localhost:27017";

//UserSchema
const userSchema = mongo.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate:function()
        {
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type: String,
        required: true,
        min: 8
    },
    confirm_password:{
        type: String,
        required: true,
        min: 8,
        validate: function()
        {
            return this.confirm_password == this    .password;
        }
    },
    role:{
        type:String,
        enum:['admin', 'user','restra', 'delivery_boy'],
        default:'user'
    },
    profileImg:{
        type:String,
        default:'img/Users/default.jpg'
    }
});

mongo.connect(url).then((db)=>
{
    console.log("connected to the Database");
    //console.log(db);
}).catch(
    function(err)
    {
        console.log(err);
    }
);

/*
//Hooks
userSchema.pre('save', function()
{
    console.log("Before saving in DB", this);
});

userSchema.post('save', function(doc)
{
    console.log("After Saving in DataBase", doc);
});
*/

userSchema.pre('save', function()
{
    this.confirm_password = undefined;
});

userSchema.pre('save', async function()
{
    let salt = await bcrypt.genSalt();

    let hashed = await bcrypt.hash(this.password, salt);

    this.password = hashed;
});

//model 
const userModel = mongo.model('userModel', userSchema);

/*
(async function creatUser()
{
    let user = {
        name: 'navin',
        email: 'nxavin@gmail.com',
        password: 'navinN4111',
        confirm_password: 'navinN4111'
    };

    let data = await userModel.create(user);
    console.log(data);
}());
*/

module.exports = userModel;
