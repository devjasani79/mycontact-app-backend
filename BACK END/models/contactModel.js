const mongoose = require("mongoose")

const contactSchema = mongoose.Schema(
    {
        user_id:{
type: mongoose.Schema.Types.ObjectId,
required:true,
ref:"User",
        },
    name:{
        type:String,
        required:[true, "Please add the contact NAME"],
    },
    email:{
        type:String,
        required:[true, "Please add the contact EMAIL"],
    },
    phone:{
        type:String,
        required:[true, "Please add the contact NUMBER"],
    },
},{
    timestamps:true,
}
);
module.exports=mongoose.model("Contact",contactSchema);