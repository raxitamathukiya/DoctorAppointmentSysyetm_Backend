const express=require('express')
const doctorroute=express()
const {doctorModel}=require('../model/doctor.model')
const {OnboardModel}=require('../model/onboard.model')
require('dotenv').config()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

doctorroute.post('/signup',async(req,res)=>{
    try {
        const { email, password,conform_password } = req.body;
    const userExists = await doctorModel.findOne({email});
    if (userExists) {
      return res.status(400).json({ msg: 'User already exists' });
    }
   else if(password!==conform_password){
    res.status(200).json({ msg: 'password and conform password does not match' });
    return;
   }
   else{
   
    bcrypt.hash(password, 10, async(err, hash)=> {
      const adddata=new doctorModel({email,password:hash,conform_password })
      await adddata.save()
      res.status(200).json({ msg: 'User created successfully' });
  });
} 
    } catch (error) {
        console.log(error)
    }
})

doctorroute.post('/login',async(req,res)=>{
    try {
        const { email, password } = req.body;
        const user = await doctorModel.findOne({ email }); 
        if (!user) {
          return res.status(401).json({ msg: 'Invalid Credentials' });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
          return res.status(401).json({ msg: 'Invalid Credentials' });
        }
        const token = jwt.sign({ userId: user._id}, process.env.SecretKey, {
          expiresIn: '7d'
        });
        res.status(200).json({ msg: 'Login Successfully' ,token:token,userid:user._id});
    } catch (error) {
        console.log(error)
    }
})

doctorroute.post('/appointments',async(req,res)=>{
    try {
        const { name,image,specialization,experience,location,date,slots,fee } = req.body;
        const adddata= new OnboardModel({name,image,specialization,experience,location,date,slots,fee })
        await adddata.save()
        res.status(200).json({ msg: 'Appointments created successfully' });
    } catch (error) {
        console.log(error)
    }
})

doctorroute.get('/appointments',async(req,res)=>{
    try {
        const data= await OnboardModel.find()
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }
})


doctorroute.get('/filter/:specialization', async (req, res) => {
    const specialization = req.params.specialization;
    try {
      const doctors = await OnboardModel.find({ specialization });
      res.json(doctors);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
 
  doctorroute.get('/sort', async (req, res) => {
    try {
      const doctors = await OnboardModel.find().sort({ date: 'asc' });
      res.json(doctors);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  
  doctorroute.get('/search', async (req, res) => {
    const doctorName = req.query.name;
    try {
      const doctors = await OnboardModel.find({ name: { $regex: doctorName, $options: 'i' } });
      res.json(doctors);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  doctorroute.put('/edit/:id',async(req,res)=>{
    try {
        let id=req.params.id
        let data= await OnboardModel.findByIdAndUpdate(id,req.body)
        res.status(200).send("data updated")
    } catch (error) {
        console.log(error)
    }
})
doctorroute.delete('/delete/:id',async(req,res)=>{
    try {
        let id=req.params.id
        let data= await OnboardModel.findByIdAndDelete(id)
        res.status(200).send("data deleted")
    } catch (error) {
        console.log(error)
    }
})
  module.exports={
    doctorroute
  }