import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

export const registerUser = async (req,res)=>{
    try{
        const {name,email,password,role} = req.body

        const existingUser= await User.findOne({email})

        if (existingUser) {
            return res.status(400).json({message:"User already exist"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role:"user",
        })

        await newUser.save()

        res.status(201).json({
            message:"User registered successfully"
        })
        
    }catch(error){
        res.status(500).json({message: error.message})
    }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};