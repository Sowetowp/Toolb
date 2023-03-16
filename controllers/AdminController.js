import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs"
// import { generatetoken } from "../utilities/generate_token.js";
import Admin from "../models/Admin.js";
import Customer from "../models/Customer.js"
import Order from "../models/Order.js";

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
                    sector: admin.sector
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
                sector: admin.sector
            }
        })
    }
})

export const get_all_customers = asyncHandler(async(req, res) => {
    const customers = await Customer.find({})
    res.json({
        status: "ok",
        message: "all customers retrieved",
        data: customers
    })
})

export const get_single_customer = asyncHandler(async(req, res) => {
    const customer = await Customer.findOne({_id: req.params.id})
    if(customer){
        res.json({
            status: "ok",
            message: "user gotten",
            data: customer
        })
    }else{
        res.json({message:"something went wrong"})
    }
})

export const update_single_customer = asyncHandler(async(req, res) => {
    const customer = await Customer.findById(req.params.id)
    const {
        firstName,
        lastName,
        password,
        email,
        address,
        postCode,
        sector
    } = req.body

    if (customer){
        customer.firstName = firstName || customer.firstName
        customer.lastName = lastName || customer.lastName 
        customer.password = password || customer.password 
        customer.email = email || customer.email
        customer.address =  address || customer.address
        customer.postCode = postCode || customer.postCode
        customer.sector = sector || customer.sector
        

        const updatedcustomer = await customer.save()

        if(updatedcustomer){
            res.status(201).json({
                status: "ok",
                message: "user updated successfully",
                data: updatedcustomer
            })
        }else{
            res.json({message:"something went wrong"})
        }
    }else{
        res.json({error:"user does not exist"})

    }
})

export const delete_single_customer = asyncHandler(async(req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id)
    if(customer){
        res.json({
            status: "ok",
            message: "user deleted successfully",
        })
    }else{
        res.json({message: "user not found"})
    }
})

export const get_all_orders = asyncHandler(async(req, res) => {
    const orders = await Order.find({})
    res.json({
        status: "ok",
        message: "all customers retrieved",
        data: orders
    })
})

export const delete_single_order = asyncHandler(async(req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id)
    if(order){
        res.json({
            status: "ok",
            message: "order deleted successfully",
        })
    }else{
        res.json({message: "order not found"})
    }
})