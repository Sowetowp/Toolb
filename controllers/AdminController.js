import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs"
import { generatetoken } from "../utilities/generate_token.js";
import Admin from "../models/Admin.js";

export const admin_sign_up = asyncHandler(async (req, res) => {
    const {
        firstName,
        lastName,
        password,
        email,
        address,
        postCode,
        sector
    } = req.body
    const adminExists = await Admin.find({email:email})
    if (adminExists.length > 0){
        throw new Error("you have an account already")
    }else{
        const hashedpass = await bcrypt.hash(password, 10)
        const admin = await Admin.create({
            firstName,lastName,email,address,postCode,sector,password: hashedpass
        })
        if(admin){
            res.json({
                status: "ok",
                message: "signed up as an admin",
                data: {
                    _id: admin._id,
                    firstName: admin.firstName,
                    lastName: admin.lastName,
                    password: admin.password,
                    email: admin.email,
                    address: admin.address,
                    postCode: admin.postCode,
                    sector: admin.sector,
                    token: generatetoken(admin._id)
                }
            })
        }else{
            res.status(400).json({
                message:"data not valid"
            })
        }
    }
})

export const admin_sign_in = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    const admin = await Admin.findOne({email})
    if(!admin || !bcrypt.compareSync(password, admin.password)){
        res.json({error: "email or password is incorrect"})
    }else{
        res.json({
            status: "ok",
            message: "login successful",
            data: {
                _id: admin._id,
                firstName: admin.firstName,
                lastName: admin.lastName,
                password: admin.password,
                email: admin.email,
                address: admin.address,
                postCode: admin.postCode,
                sector: admin.sector,
                token: generatetoken(admin._id)
            }
        })
    }
})