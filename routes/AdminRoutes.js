import express from "express";
import { admin_sign_up } from "../controllers/AdminController.js";
import { customerProtect } from "../middlewares/auth_handlers.js";

const admin_router = express.Router()
admin_router.route("/")
    .post(admin_sign_up)


export default admin_router