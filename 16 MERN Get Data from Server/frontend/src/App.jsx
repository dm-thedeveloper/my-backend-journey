import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
function App (){


  let [employee,setemployee]= useState([]);
  useEffect(()=>{

axios.get('api/employee')
.then((res)=>{

setemployee(res.data)

})
.catch((err)=>{console.log(err);})

  })

  return(<>
  

  <h1>our Company memebers</h1>
<h3>total memebers : {employee.length} </h3>



{

  employee.map((e,i)=>{
    let id= i+1;

    return(<>
   <div key={id} className='cards'>
  <p>id:{id} </p>
  <h2>Name: {e.name}</h2>
  <h3>Position: {e.position}  (departmen: {e.department}  )</h3>
</div>
    </>)
  })
}
  
  
  </>)
}
export default App
