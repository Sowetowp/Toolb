import asyncHandler from "express-async-handler";
import Tools from "../models/Tools";

export const create_tool = asyncHandler(async (req, res) => {
    const {
        image,
        toolName,
        price,
        availability
    } = req.body
    const toolExists = await Admin.find({toolName:toolName})
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