import express from "express";
import { available_tools, create_tool, delete_single_order, get_all_orders, get_all_tools, hire_tool, update_tool } from "../controllers/ToolsController.js";

const tools_router = express.Router()

tools_router.route("/")
    .post(create_tool)
    .get(get_all_tools)
tools_router.route("/available")
    .get(available_tools)
tools_router.route("/hire")
    .get(get_all_orders)
tools_router.route("/:id")
    .patch(update_tool)
tools_router.route("/hire/:id")
    .post(hire_tool)
    .delete(delete_single_order)


export default tools_router