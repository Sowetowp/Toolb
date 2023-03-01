import express from "express";
import { customerProtect } from "../middlewares/auth_handlers.js";
import { customer_sign_up } from "../controllers/CustomerController.js";

const customer_router = express.Router()
customer_router.route("/")
    .post(customer_sign_up)


export default customer_router