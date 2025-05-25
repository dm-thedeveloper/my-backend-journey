import { useState,useEffect } from 'react'
import './App.css'
import axios from 'axios';
import { Reg } from './Reg.jsx';
function App() {



const [api,setapi]=useState([]);
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await axios.get('/APIUser/API'); // Replace with your API endpoint
//       setapi(response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   fetchData();
// }, []);

useEffect(() => {
  axios.get('/APIUser/API')
    .then((res) => { setapi(res.data) })
    .catch((err) => { console.log(err); });
}, []);

  return (
   <>
   <h1>API Length {api.length}</h1>
   <ul>
          {api.map((item, index) => (
            <li key={index}>{item.name}</li> // Adjust rendering logic based on your data structure
          ))}
        </ul>
   h1llo Wolrd !!!!!
   
   <Reg/>
   
   </>
  )
}

export default App
