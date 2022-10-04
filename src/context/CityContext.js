import React, { useState, createContext } from "react";
  
const CityContext = createContext();

export const CityProvider = ({ children }) => {

    const [cityDetails, setCityDetails] = useState({name: 'Noida', lat: 28.58, lon: 77.330002});
  
    return (
        <CityContext.Provider value={{ cityDetails, setCityDetails }}>
            {children}
        </CityContext.Provider>
    );
};

export default CityContext