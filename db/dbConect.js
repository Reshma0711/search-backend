const dotenv=require("dotenv")
dotenv.config()
const mongoose=require("mongoose")
const mongouUri=process.env.MONGOURI

exports.dbConnect=async (req,res)=>{
    try{
        await mongoose.connect(mongouUri)
        console.log("Database Connection Successful")
    }
    catch(err){
        console.log(error)
        res.send(500).json({
            message:err.message,
            success:false
        })
    }
}