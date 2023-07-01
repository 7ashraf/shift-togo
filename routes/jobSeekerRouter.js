const express = require('express')
const router = express.Router()
const { createJobSeeker, updateJobSeeker, deleteJobSeeker, getJobSeeker, createJobApplication, getJobApplications} = require('../controllers/jobSeeker')

//create job seeker
router.post('/', createJobSeeker)

//get job seeker job applications
router.get('/job-applications/', getJobApplications)

//get employer
router.get('/', getJobSeeker)

//update employer
router.patch('/:id', updateJobSeeker)

//delete employer
router.delete('/:id', deleteJobSeeker)



//create job listing for an employer
router.post('/job-application/', createJobApplication)


module.exports = router