import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {

    let [articles,serArticles]=useState([]);

useEffect(()=>{

axios.get('/api/articles')
.then((res)=>{
    serArticles(res.data);
   

})
.catch((err)=>console.log("Error : \n"))
})

    
return(<>
<h1>today's articlea</h1>

<h3>total articles : {articles.length} </h3>

{
    articles.map((a,i)=>{
        return(<>

        <div key={a.id}>
        <p>{a.id}</p>
        <h1>{a.title}</h1>
        <h2>
            {a.author}
        </h2>
        <h3>{a.date}</h3>

        </div>
       
        </>)

    })
}

</>)
}

export default App
