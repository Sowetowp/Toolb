import asyncHandler from "express-async-handler";
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
    const {
        availability
    } = req.body

    if (tool){
        tool.availability = availability || tool.availability
        

        const updatedtool = await Tools.save()

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