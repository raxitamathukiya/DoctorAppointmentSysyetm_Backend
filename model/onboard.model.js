const mongoose=require('mongoose')
const OnboardSchema=mongoose.Schema({
  
    name:{type:String,require:true},
	  image: {type:String,require:true},
	  specialization: {type:String,require:true},
	  experience: {type:Number,require:true},
	  location: {type:String,require:true},
	  date: {type:Date,require:true},
	slots : {type:Number,require:true},
	  fee: {type:Number,require:true}
  
})

const OnboardModel=mongoose.model("Onboard",OnboardSchema)
module.exports={
    OnboardModel
}