import React, { useState, createContext } from "react";
import { data } from "../constants/data";

const ResultContext = createContext();

export const ResultProvider = ({ children }) => {

    const [results, setResults] = useState(data);
  
    return (
        <ResultContext.Provider value={{ results, setResults }}>
            {children}
        </ResultContext.Provider>
    );
};

export default ResultContext