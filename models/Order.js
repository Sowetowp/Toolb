import mongoose from "mongoose";

const OrderSchema = mongoose.Schema(
    {
        toolId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tools"
        },
        firstName: {type : String},
        lastName: {type: String},
        email: {type : String},
        address: {type : String}
    }
)

const Order = mongoose.model("Order", OrderSchema)
export default Order