const User = require('../modules/User');
const dotEnv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

dotEnv.config();

const userRigister = async (request, response) => {
    const {username, email, password} = request.body;
    try {
        const dbUsername = await User.findOne({username});
        if(dbUsername){
            return response.status(400).json({message: "username already taken"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();
        response.status(200).json({message: "user created Successfully"});
    } catch (error) {
        response.status(400).json({message: error.message})
    }
}

const userLogin = async(request, response) => {
    const {username, password} = request.body;
    try {
        const dbUser = await User.findOne({username});
        if(dbUser === null){
            return response.status(400).json({message: "Invalid User"});
        }
        const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
        if(isPasswordMatched){
            const payload = {
                username,
            }
            const jwtToken = jwt.sign(payload, await process.env.SECRET_KEY);
            response.status(200).json({jwtToken,user_id: dbUser._id, username: dbUser.username});
        }else {
            response.status(400).json({message: "Invalid Password"});
        }
    } catch (error) {
        console.log(error);
        response.status(400).json({message: error.message})
    }
}

module.exports = {userRigister, userLogin};