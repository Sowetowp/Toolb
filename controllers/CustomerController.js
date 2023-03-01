import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs"
import { generatetoken } from "../utilities/generate_token.js";
import Customer from "../models/Customer.js"

export const customer_sign_up = asyncHandler(async (req, res) => {
    const {
        firstName,
        lastName,
        password,
        email,
        address,
        postCode,
        sector
    } = req.body
    const customerExists = await Customer.find({email:email})
    if (customerExists.length > 0){
        throw new Error("you have an account already")
    }else{
        const hashedpass = await bcrypt.hash(password, 10)
        const customer = await Customer.create({
            firstName,lastName,email,address,postCode,sector,password: hashedpass
        })
        if(customer){
            res.json({
                status: "ok",
                message: "account created succesfully",
                data: {
                    _id: customer._id,
                    firstName: customer.firstName,
                    lastName: customer.lastName,
                    password: customer.password,
                    email: customer.email,
                    address: customer.address,
                    postCode: customer.postCode,
                    sector: customer.sector,
                    token: generatetoken(customer._id)
                }
            })
        }else{
            res.status(400).json({
                message:"data not valid"
            })
        }
    }
})