const Employer = require('../models/employer')
const JobListing = require('../models/jobListing')
const User = require('../models/User')

//create new employer for a user
const createEmployer = async (req, res)=>{
    const {email} = req.body
    try {
        const user = await User.findOne({email:email})
        const employer = await Employer.create({user})
        res.status(200).json(employer)
    } catch (error) {
        console.log(error.message)
        res.status(400).json({error: error})
    }
}

//get employer
const getEmployer = async(req, res)=>{
    console.log('get empl')
    const {id} = req.param
    const {email} = req.body
    //const user = getUser()
    console.log('get empl')
    try{
        const user = await User.find({email:email})
        const employer = await Employer.findOne({user: user})
        //or find employee by user 
        res.status(200).json(employer)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//update employer data
const updateEmployer = async(req, res)=>{

}
//delete employer
const deleteEmployer = async(req, res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "employer does not exist"})
    }
    const employer = await Employer.findOneAndDelete({_id: id})
    res.status(200).json(employer)
}

//view JobListingApplications

//get employers jobListings
const getJobListings = async(req, res)=>{
    const {email} = req.body
    //find employer by current user or by id
    try{
    const user = await User.findOne({email:email })
    const employer = await Employer.findOne({user:user}).populate('jobListings')
    //console.log(employer)
    //const id = employer._id
    //console.log(id)
    const jobListings = employer.jobListings
    res.status(200).json(jobListings)
    }catch(error){
        res.status(400).json({error: error.message})
    }
    
}

const createJobListing = async (req, res)=>{
    //get user by unique identifier id or email
    const {email} = req.body
    const {title,description,requirements,status} = req.body
    try{
        const user = await User.find({email:email })
        //consolo.log(user)
        const poster = await Employer.findOne({user:user})
        const jobListing = await JobListing.create({title, description, requirements, status})
        await Employer.findOneAndUpdate(
            { _id: poster._id }, 
            { $push: { jobListings: jobListing } }
        );

        res.status(200).json(jobListing)
    }catch(error){
        console.log(error)
        res.status(400).json({error: error.message})
    }
}




module.exports = { createEmployer, getEmployer, updateEmployer, deleteEmployer, getJobListings, createJobListing}