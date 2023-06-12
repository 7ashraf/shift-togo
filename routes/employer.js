const express = require('express')
const router = express.Router()
const {createEmployer, getEmployer, updateEmployer, deleteEmployer, getJobListings} = require('../controllers/employer')
const { createJobListing } = require('../controllers/employer')

//create employer
router.post('/', createEmployer)

//get employer
router.get('/:id', getEmployer)

//update employer
router.patch('/:id', updateEmployer)

//delete employer
router.delete('/:id', deleteEmployer)

//get employers jobListings
router.get('/job-listings', getJobListings)

//create job listing for an employer
router.post('/job-listing', createJobListing)
module.exports = router