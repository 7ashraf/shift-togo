const User = require('../models/User')
const JobApplication = require('../models/jobApplication')
const JobListing = require('../models/jobListing')
const JobSeeker = require('../models/jobSeeker')

//create new jobSeeker for a user
const createJobSeeker = async (req, res)=>{
    const user = getUser()
    try {
        const jobSeeker = await JobSeeker.create({user})
        res.status(200).json(jobSeeker)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//get job seeker by id or any other unique identifier
const getJobSeeker = async(req, res)=>{
    const {id} = req.param
    //const user = getUser()
    try{
        const jobSeeker = await JobSeeker.findById(id)
        //or find job seeker by user 
        res.status(200).json(jobSeeker)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//update job seeker data
const updateJobSeeker = async(req, res)=>{

}

//delete job seeker
const deleteJobSeeker = async(req, res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "job seeker does not exist"})
    }
    const jobSeeker = await JobSeeker.findOneAndDelete({_id: id})
    res.status(200).json(jobSeeker)
}

//view submitted applications 
const getJobApplications = async(req, res)=>{
    const {email} = req.body
    try{
        const user = await User.find({email:email })
        const jobSeeker = await JobSeeker.find({user:user})
        const jobApplications = await JobApplication.find({jobSeeker:jobSeeker})
        res.status(200).json(jobApplications)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//create a job submit a job application
const createJobApplication = async(req, res)=>{
    const {email, jobListingId, note} = req.body
    try{
        //get user
        const user = await User.find({email:email})
        //get associated job seeker 
        const jobSeeker = await JobSeeker.find({user:user})
        //get job Listing to apply
        const jobListing = await JobListing.findById(jobListingId)
        //create job application 
        const jobApplication = await JobApplication.create({
            jobSeeker: jobSeeker,
            jobListing: jobListing,
            status: 'applied',
            note: note
        })
        jobSeeker.openApplications.push(jobApplication)
    }catch(error){
        res.status(400).jsonA({error:error.message})
    }
}



module.exports = { createJobSeeker}