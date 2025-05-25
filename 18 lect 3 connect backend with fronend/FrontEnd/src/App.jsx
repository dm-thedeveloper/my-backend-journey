import  {useEffect, useState}  from 'react'
import './App.css';
import axios from 'axios';

function App() {
let [c,setc]=useState([{}])

useEffect(()=>{
  axios.get('/api/jokes')
  .then((response)=>{
  setc(response.data)
  }).catch((err)=>{
    console.log(err);
  })

})
  return (
    <>
    <h1>Chai aur FullStack</h1>
    <p>JOKES:{c.length} </p>

{
  c.map((v,i)=>{

    return(<><div key={v.id}>
      <h3>{v.id}. {v.title} </h3>
      <p><b>{v.content}</b></p>
    </div></>)


  }) 
}

    </>
  ) 
}

export default App
