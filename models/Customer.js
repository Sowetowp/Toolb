import mongoose from "mongoose";

const CustomerSchema = mongoose.Schema(
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

const Customer = mongoose.model("Customer", CustomerSchema)
export default Customer