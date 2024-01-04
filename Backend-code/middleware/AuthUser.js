import User from "../models/UserModel.js";

export const verifyUser = async (req, res, next) =>{
    if(!req.session.userId){
        return res.status(401).json({message: "Please Sign In to your Account!"});
    }
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User Not Found"});
    req.userId = user.id;
    req.role = user.role; 
    next();
}

export const adminOnly = async (req, res, next) =>{
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User Not Found"});
    if(user.role !== "admin") return res.status(403).json({msg: "Akses terlarang"});
    next();
}