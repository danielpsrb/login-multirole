import User from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async (req, res) =>{
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if(!user) return res.status(404).json({message: "User Not Found"});
    const match = await argon2.verify(user.password, req.body.password);
    if(!match) return res.status(400).json({message: "Password incorrect"});
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    res.status(200).json({uuid, name, email, role});
}

export const Visitor = async (req, res) =>{
    if(!req.session.userId){
        return res.status(401).json({message: "Please Sign In to Your Account!"});
    }
    const user = await User.findOne({
        attributes:['uuid','name','email','role'],
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({message: "User Not Found"});
    res.status(200).json(user);
}

export const Logout = (req, res) =>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "Unable to log out at the moment"});
        res.status(200).json({message: "Logout Successful"});
    });
}