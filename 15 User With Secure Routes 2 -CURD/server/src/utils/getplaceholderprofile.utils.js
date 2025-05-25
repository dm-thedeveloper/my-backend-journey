import axios from "axios";

export const getPlaceholder = async (string)=>{
let firstletter = string.trim().slice(0,1) ; 
// https://placehold.co/600x400/black/red?text=A
try {
    console.info("Loading........");
    const response = await axios.get(`https://placehold.co/600x400/03fcf8/ffff?text=${firstletter}`) ; 
    const data = await response.data
    console.log(data.responseUrl);
    
// return response ; 
    
} catch (error) {   
    console.log("Palceholder not Find" , error);
    
}
}

