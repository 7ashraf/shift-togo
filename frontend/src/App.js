import './App.css';
import { useEffect, useState } from 'react';
function App() {
  const [helloWorld, setHelloWorld] = useState(null)
  const fetchHello = async()=>{
    const response = await fetch('/api/')
    try{
    const json = await response.json()
    if(response.ok){
      setHelloWorld(json.response)
      console.log(json)
  }else{
  }
    }catch(error){
      console.log(error)

    }
    
}
  useEffect(() => {
    
    
  fetchHello()
  
   
  }, [helloWorld])
  
  
  return (
    
    <div className="App">
      <h1>
        {helloWorld}
      </h1>
    </div>
  );
}

export default App;
