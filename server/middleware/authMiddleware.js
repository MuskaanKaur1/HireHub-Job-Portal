import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) =>{
    try{

        const authHeader= req.headers.authorization;

        if (!authHeader) {
      return res.status(401).json({ message: "No token, not authorized" });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

        if(!token){
            return res.status(401).json({message: "Token format invalid"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;

        next();
    }catch(error) {
        return res.status(401).json({message:"Token failed"});
    }
};

