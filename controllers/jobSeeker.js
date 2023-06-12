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






module.exports = { createJobSeeker}