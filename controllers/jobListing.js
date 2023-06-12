const JobListing = require('../models/jobListing')
const Employer = require('../models/employer')
const JobApplication = require('../models/jobApplication')


//creates new job listing
const createJobListing = async (req, res)=>{
    const user = await getUser()
    const {title,description,requirements,status} = req.body
    try{
        const employer = await Employer.find({user:user})
        const jobListing = await JobListing.create({title, description, requirements, status, employer})
        res.status(200).json(jobListing)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//get jobListing
const getJobListing = async(req, res)=>{
    const {id} = req.body
    try{
    const jobListing = await jobListing.findById(id)
    res.status(200).json(jobListing)
    }catch(error){
        return res.status(404).json({error: 'Job listing does not exist'})
    }
}

const getAllJobListings = async(req, res)=>{
    const jobListings = await jobListing.find({})
    res.status(200).json(jobListings)
}


//update jobListing
const updateJobListing = async(req, res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "job listing does not exist"})
    }
    try {
        const jobListing = await JobListing.findByIdAndUpdate({_id: id}, {
            ...req.body
        })
        res.status(200).json(jobListing)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    

}


//delete job listing by id
const deleteJobListing = async(req, res)=>{
    const id = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "job listing does not exist"})
    }
    const jobListing = await JobListing.findOneAndDelete({_id: id})
    res.status(200).json(jobListing)
}

//get job applications for job listing 
const getJobApplications = async(req, res)=>{
    const {id} = req.params
    try{
    const jobListing = await JobListing.findById(id)
    const jobApplications = await JobApplication.find({jobListing:jobListing})
    res.status(200).json(jobApplications)
    }catch(error){
        res.status(400).json({error:error.message})

    }
}
module.exports = {createJobListing}