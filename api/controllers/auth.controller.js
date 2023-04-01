import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const register = async (req, res, next) => {
    try{
        const hash = bcrypt.hashSync(req.body.password, 5);
        const newUser = new User(
            {
                ...req.body,
                password: hash,
            }
        );
        await newUser.save(); 
   res.status(201).json( "User created successfully")
    }catch(err){
        next(err)
        //res.status(500).send("Something went wrong!" + err)
    }
} 

export const login = async (req, res, next) => {
    try{
        const user = await User.findOne({username: req.body.username});
      
        if(!user){
           return next(createError(400, "User not found!"))
        }

        const isCorrect = bcrypt.compareSync(req.body.password, user.password);
        console.log(isCorrect)
        if(!isCorrect){
            return next(createError(400, "Invalid credentials !"))
        }
       
        const token = jwt.sign({
            id: user._id,
            isSeller: user.isSeller,
        }, 
         process.env.JWT_KEY,
        )

       const {password, ...others} = user._doc;
        res.cookie("acessToken", token, {
            httpOnly: true,
        }).status(200).send(others)
    }catch(err){
        next(err)
    }
}







export const logout = async (req, res) => {
    res.clearCookie("acessToken", {
        sameSite: "none",
        secure: true, 
    }).status(200).send("Logged out successfully!")
}