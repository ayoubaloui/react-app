// appReducer.js
const initialState = {
    countries: [],
    singleCountry: null,
    cities: [],
    singleCity: "",
    submit: false,
  };
  
  const appReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_COUNTRIES":
        return { ...state, countries: action.payload };
      case "SET_SINGLE_COUNTRY":
        return { ...state, singleCountry: action.payload };
      case "SET_CITIES":
        return { ...state, cities: action.payload };
      case "SET_SINGLE_CITY":
        return { ...state, singleCity: action.payload };
      case "SET_SUBMIT":
        return { ...state, submit: action.payload };
      default:
        return state;
    }
  };
  
  export default appReducer;
  