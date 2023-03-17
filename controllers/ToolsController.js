import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";
import Tools from "../models/Tools.js";

export const create_tool = asyncHandler(async (req, res) => {
    const {
        image,
        toolName,
        price,
        availability
    } = req.body
    const toolExists = await Tools.find({toolName:toolName})
    if (toolExists.length > 0){
        throw new Error("tool name exists aleady")
    }else{
        const tool = await Tools.create({
            image,toolName,price,availability
        })
        if(tool){
            res.json({
                status: "ok",
                message: "tool created successfully",
                data: {
                    _id: tool._id,
                    image: tool.image,
                    toolName: tool.toolName,
                    price: tool.price,
                    availability: tool.availability
                }
            })
        }else{
            res.status(400).json({
                message:"data not valid"
            })
        }
    }
})

export const get_all_tools = asyncHandler(async(req, res) => {
    const tools = await Tools.find({})
    res.json({
        status: "ok",
        message: "all tools retrieved",
        data: tools
    })
})

export const available_tools = asyncHandler(async(req, res) => {
    const tools = await Tools.find({})
    const available = tools.filter((e) => {return e.availability == true})
    res.json({
        status: "ok",
        message: "all tools retrieved",
        data: available
    })
})

export const update_tool = asyncHandler(async(req, res) => {
    const tool = await Tools.findById(req.params.id)

    if (tool){

        tool.availability = !tool.availability

        const updatedtool = await tool.save()

        if(updatedtool){
            res.status(201).json({
                status: "ok",
                message: "tool updated successfully",
                data: updatedtool
            })
        }else{
            res.json({message:"something went wrong"})
        }
    }else{
        res.json({error:"tool does not exist"})

    }
})

export const hire_tool = asyncHandler(async(req, res) => {
    try {
        const toolId = await Tools.findById(req.params.id)
        const {firstName, lastName, email, address} = req.body
        const hiredTool = await Order.create({
            toolId: toolId.toolName, firstName, lastName, email, address
        })
        if(hiredTool){
            res.status(201).json({
                status: "ok",
                message: "Tool hired successfully",
                data: hiredTool
            })
        }else{
            res.json({
                message: "Error hiring your tool"
            })
        }    
    } catch (error) {
        res.json({
            error: error
        })
    }
})

export const get_all_orders = asyncHandler(async(req, res) => {
    const orders = await Order.find({})
    if(orders){
        res.json({
            status: "ok",
            message: "all orders retrieved",
            data: orders
        })
    }else{
        res.json({message: "orders not found"})
    }
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