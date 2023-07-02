import { useState,  } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const useSignup = ()=>{
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()


    const createEmployer = async (email)=>{
        console.log('creating employer for the associated user')
        const response = await fetch('/api/employer', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email })
          })
          const json = await response.json()
      
          if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
          }
          if (response.ok) {
            console.log('created employer')
            
      
            // update loading state
            setIsLoading(false)
          }
        
    }

    const createJobSeeker = async (email)=>{
        console.log('creating job seeker for the associated user')
        const response = await fetch('/api/job-seeker', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email })
          })
          const json = await response.json()
      
          if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
          }
          if (response.ok) {
            console.log('created job-seeker')
            
      
            // update loading state
            setIsLoading(false)
          }
    }

    const signup = async (email, password, firstName, lastName, role) =>{
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({email, password, firstName, lastName})
        })

        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            
            if(role === 'employer'){
                await createEmployer(email)
            }
            else if(role === 'jobSeeker'){
                await createJobSeeker(email)
            }

            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type: 'LOGIN', payload: json})
            
            setIsLoading(false)
        }
    }

    return {signup, isLoading, error}
}
