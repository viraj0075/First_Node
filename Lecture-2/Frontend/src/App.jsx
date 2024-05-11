import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios";



function App() {
  const [jokes, setJokes] = useState([]);

  useEffect(() => 
  {
    axios.get("/api/jokes").then(res => setJokes(res.data));
  },[jokes])

  return (
    <div>
    <h1>This is Viraj Koradia Code</h1>
    <p>{jokes.length}</p>
     {jokes.map((items) => 
     (
        <div key={items.id}>
          <h2>{items.joke}</h2>
        </div>
      ))}
    </div>
  )
}

export default App
