import mongoose from "mongoose";

const AdminSchema = mongoose.Schema(
    {
        firstName: {type : String},
        lastName: {type : String},
        email: {type : String},
        address: {type : String},
        postCode: {type : String},
        sector: {type : String},
        password: {type : String}
    }
)

const Admin = mongoose.model("Admin", AdminSchema)
export default Admin