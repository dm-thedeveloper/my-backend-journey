import { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios';

function App() {
let [team,setteam]=useState([]);


useEffect(()=>{
axios.get('/api/mendata')
.then(
  (res)=>{
    setteam(res.data)
  }
).catch((err)=>console.log(err))


})


  return (
    <>
     <h1>My team</h1>
     <h2>total mebers: {team.length}</h2>


{
team.map((v,i)=>{
  let id= i+1;
  return(<>
  
  <div className='card' key={i}>
      <h3>id:{id} </h3>
      <h2>Name:{v.name}</h2>
      <h3>Occupatio:{v.occupation} </h3>
      <h3>age :{v.age}</h3>

     </div>
  </>)
})

}

 
    </>
  )
}

export default App
