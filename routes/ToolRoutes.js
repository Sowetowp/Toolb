import express from "express";
import { create_tool, get_all_tools } from "../controllers/ToolsController.js";

const tools_router = express.Router()

tools_router.route("/")
    .post(create_tool)
    .get(get_all_tools)


export default tools_router