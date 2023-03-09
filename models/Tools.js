import mongoose from "mongoose";

const ToolsSchema = mongoose.Schema(
    {
        image: {type : String},
        toolName: {type : String},
        price: {type : String},
        availability: {type : Boolean}
    }
)

const Tools = mongoose.model("Tools", ToolsSchema)
export default Tools