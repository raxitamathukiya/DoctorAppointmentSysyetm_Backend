const mongoose=require('mongoose')
const doctorSchema=mongoose.Schema({
    email:{type:String,require:true},
    password:{type:String,require:true},
    conform_password:{type:String,require:true}
})

const doctorModel=mongoose.model("doctor",doctorSchema)
module.exports={
    doctorModel
}