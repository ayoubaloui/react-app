// App.js
import { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import appReducer from './appReducer'; 

const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const Header = styled.h1`
  color: #333;
`;

const Select = styled.select`
  margin: 10px;
  padding: 5px;
`;

const Button = styled.button`
  margin: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
`;

const Result = styled.h3`
  margin-top: 20px;
  color: #333;
`;

function App() {
  const [state, dispatch] = useReducer(appReducer, {
    countries: [],
    singleCountry: null,
    cities: [],
    singleCity: "",
    submit: false,
  });

  const { countries, singleCountry, cities, singleCity, submit } = state;

  const fetchCountries = async () => {
    try {
      const country = await axios.get("https://countriesnow.space/api/v0.1/countries");
      dispatch({ type: "SET_COUNTRIES", payload: country.data.data });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCities = (country) => {
    dispatch({ type: "SET_SUBMIT", payload: false });
    dispatch({ type: "SET_SINGLE_CITY", payload: null });
    dispatch({ type: "SET_SINGLE_COUNTRY", payload: country });
    const findCities = countries.find((c) => c.country === country);
    dispatch({ type: "SET_CITIES", payload: findCities.cities });
  };

  const submitHandle = () => {
    if (singleCountry && singleCity) {
      dispatch({ type: "SET_SUBMIT", payload: true });
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <Container>
      <Header>Select Your HomeTown</Header>
      <div>
        {countries && (
          <Select onChange={(e) => fetchCities(e.target.value)} value={singleCountry}>
            <option disabled selected hidden>
              Select Country
            </option>
            {countries.map((country) => (
              <option key={`${country.country}`} value={country.country}>
                {country.country}
              </option>
            ))}
          </Select>
        )}

        {cities && (
          <Select onChange={(e) => dispatch({ type: "SET_SINGLE_CITY", payload: e.target.value })} value={singleCity}>
            <option disabled selected hidden>
              Select City
            </option>
            {cities.map((city) => (
              <option value={city} key={city}>
                {city}
              </option>
            ))}
          </Select>
        )}

        <Button onClick={submitHandle}>GO</Button>
      </div>

      {submit && <Result>Your country is {singleCountry} and your city is {singleCity}</Result>}
    </Container>
  );
}

export default App;
