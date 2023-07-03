import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useEffect } from 'react';
import JobListing from '../components/JobListing';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)
  const [nextPage, setNextPage] = useState(0)
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const [error, setError] = useState(null)
  const [jobListings, setJobListings] = useState([])

  const getNextPage = async() =>{
    setCurrentPage(parseInt(currentPage) + 1)
    window.scrollTo(0, 0)
  }

  const fetchJobListings = async() =>{
    const response = await fetch(`/api/job-listing?page=${currentPage}`, {
      method: 'GET',
      headers: {'Content-Type' : 'application/json'},
    })

  const json = await response.json()

  if(!response.ok){
      setIsLoading(false)
      setError(json.error)
  }
  if(response.ok){
    console.log(json)
    //setData(data)
    setJobListings(json.jobListings)
    setCurrentPage(json.currentPage)
    setNextPage(json.nextPage)
    setIsLoading(false)
  }
  }
  useEffect(() => {
    
    if(data){
      setPageCount(data.currentPage)
    }
    

    fetchJobListings()

    
  }, [data, currentPage])

  if(isLoading){
    console.log('loading')
    return (<h1>Loading...</h1>)
  }
  
  return (
    <div>
      <h1>Search for a job</h1>
      
      <div class="d-flex p-2">
      
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search by title"
          aria-label="Search by title"
          aria-describedby="basic-addon2"
        />
        <Button variant="outline-secondary" id="button-addon2">
          search
        </Button>
      </InputGroup>


      </div>
      {jobListings?.map((jobListing) => (
        
        <JobListing companyName = {`${jobListing.poster.user.firstName} ${jobListing.poster.user.lastName}`}
        jobTitle = {jobListing.title}
        description = {jobListing.description}
        requirements = {jobListing.requirements}
        ></JobListing>
      ))}
      
      <button disabled={nextPage? false : true} onClick={getNextPage}>{nextPage? 'get next page' : 'no more data'}</button>

     
      
      
    </div>
  )
}
