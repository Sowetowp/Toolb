import express from "express";
import { admin_sign_in, admin_sign_up } from "../controllers/AdminController.js";
import { customerProtect } from "../middlewares/auth_handlers.js";

const admin_router = express.Router()
admin_router.route("/")
    .post(admin_sign_up)
admin_router.route("/in")
    .post(admin_sign_in)


export default admin_router