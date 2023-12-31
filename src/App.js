import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'; // Import axios here


function App() {
  //states to store my data 
  const [countries,setCountries] = useState([]); 
  const [singleCountry, setsingleCountry] =useState();
  const [cities, setCities] =useState([]);
  const [singleCity, setSingleCity] =useState("");
  const [submit,setSubmit] = useState(false);


  //i'm going to fetch an API so it must be async and await 
  const fetchCountries = async() =>{
    try {
      const country=await axios.get("https://countriesnow.space/api/v0.1/countries"); 
      setCountries(country.data.data);
    } catch (error) {
      console.log(error);
      
    }
  }
 
const fetchCities = (country)=> {
  setSubmit(false);
  setSingleCity(null);
  setsingleCountry(country);
  const findCities = countries.find((c) =>  c.country===country );
  setCities(findCities.cities);
};

const submitHandle  = () => {
  if(singleCountry && singleCity){
    setSubmit(true);

  }
}
//useEffect don't allow to use an async function
useEffect(() =>{
  fetchCountries();
}, []);

  return ( <div className='App'> 
              <div className="App-header">  
              <h1>  Select Your HomeTown</h1>
              <div>
              { countries && <select onChange={(e) => fetchCities(e.target.value)} value={singleCountry} >
                  <option disabled selected hidden>
                    Select Country
                  </option>
                  {
                    countries.map((country) => (
                       <option key={`${country.country}`} value={country.country} > {country.country} </option>
                    ))}
                  
                 </select>  }


                 { cities &&(
                 <select onChange={(e)=>setSingleCity(e.target.value)} value={singleCity} >
                  <option disabled selected hidden>
                    Select City
                  </option>
                  {cities.map((city)=>(
                    <option value={city} key={city}>  {city} </option>

                  ))}
                 </select> )}

                 <button onClick={submitHandle} > GO </button>
              </div>

              { submit && (<h3> 
                Your country is {singleCountry} and your city is {singleCity} 
                 </h3> )}
              
              </div>   

  </div> );
}

export default App;
