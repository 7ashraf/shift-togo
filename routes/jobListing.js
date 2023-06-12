const express = require('express')
const { getJobListing, updateJobListing, deleteJobListing, getAllJobListings, getJobApplications } = require('../controllers/jobListing')
const router = express.Router()

// //create jobListing<handled in employer route>
// router.post('/', createEmployer)

//get jobListing
router.get('/:id', getJobListing)

//update job listing
router.patch('/:id', updateJobListing)

//delete job listing
router.delete('/:id', deleteJobListing)

//get all jobListings
router.get('/', getAllJobListings)

//get job applications for a job listing
router.post('/:id/job-applications', getJobApplications)

module.exports = router