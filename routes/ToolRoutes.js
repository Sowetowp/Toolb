import express from "express";
import { available_tools, create_tool, get_all_tools, update_tool } from "../controllers/ToolsController.js";

const tools_router = express.Router()

tools_router.route("/")
    .post(create_tool)
    .get(get_all_tools)
tools_router.route("/available")
    .get(available_tools)
tools_router.route("/:id")
    .get(update_tool)


export default tools_router