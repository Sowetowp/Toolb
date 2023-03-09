import express from "express";
import { admin_sign_in, admin_sign_up, delete_single_customer, get_all_customers, get_single_customer, update_single_customer } from "../controllers/AdminController.js";
// import { customerProtect } from "../middlewares/auth_handlers.js";

const admin_router = express.Router()
admin_router.route("/")
    .post(admin_sign_up)
    .get(get_all_customers)
admin_router.route("/in")
    .post(admin_sign_in)
admin_router.route("/:id")
    .get(get_single_customer)
    .patch(update_single_customer)
    .delete(delete_single_customer)


export default admin_router