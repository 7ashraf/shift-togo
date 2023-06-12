const Employer = require('../models/employer')
const JobListing = require('../models/jobListing')
const User = require('../models/User')

//create new employer for a user
const createEmployer = async (req, res)=>{
    const {email} = req.body
    console.log(email)
    try {
        const user = await User.find({email:email})
        console.log(user)

        const employer = await Employer.create({user})
        res.status(200).json(employer)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//get employer
const getEmployer = async(req, res)=>{
    const {id} = req.param
    const user = getUser()
    try{
        const employer = await Employer.findById(id)
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
    const user = getUser()
    //find employer by current user or by id
    try{
    const employer = await Employer.find({user:user})
    const jobListings = await JobListing.find({employer:employer})
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
        const user = User.find({email:email })
        const employer = await Employer.find({user:user})
        const jobListing = await JobListing.create({title, description, requirements, status, employer})
        res.status(200).json(jobListing)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}




module.exports = { createEmployer, getEmployer, updateEmployer, deleteEmployer, getJobListings, createJobListing}