const User = require('../models/User')
const JobApplication = require('../models/jobApplication')
const JobListing = require('../models/jobListing')
const JobSeeker = require('../models/jobSeeker')

//create new jobSeeker for a user
const createJobSeeker = async (req, res)=>{
    const {email} = req.body
    console.log(email)
    try {
        const user = await User.findOne({email:email})
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
        const user = await User.findOne({email:email })
        const jobSeeker = await JobSeeker.findOne({user:user}).populate('openApplications')
        const jobApplications = await jobSeeker.openApplications
        
        res.status(200).json(jobApplications)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//create a job submit a job application
const createJobApplication = async(req, res)=>{
    //if not exists
    const {email, jobListingId, note} = req.body
    try{
        //get user
        const user = await User.findOne({email:email})
        //get associated job seeker 
        const jobSeeker = await JobSeeker.findOne({user:user})
        console.log(jobSeeker)
        //get job Listing to apply
        const jobListing = await JobListing.findById(jobListingId)
        //create job application 
        const jobApplication = await JobApplication.create({
            jobSeeker: jobSeeker,
            jobListing: jobListing,
            status: 'applied',
            note: note
        })
        console.log(jobApplication);
        const jobSeekerId = jobSeeker._id;
        console.log(`Job Seeker id: ${jobSeekerId}`);
        //update job seeker to include the application
        await JobSeeker.findOneAndUpdate(
            { _id: jobSeeker._id }, 
            { $push: { openApplications: jobApplication } }
        );
        //update the job listing to include te application
        await JobListing.findOneAndUpdate(
            { _id: jobListing._id }, 
            { $push: { applications: jobApplication } }
        );
        res.status(200).json(jobApplication)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}



module.exports = { createJobSeeker, updateJobSeeker, deleteJobSeeker, getJobSeeker, createJobApplication, getJobApplications}