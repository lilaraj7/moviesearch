import React, { useContext, useEffect, useState } from "react";

export const API_URL = ` http://www.omdbapi.com/?apikey=55c6031b`;
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isloading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [iserror, setIsError] = useState({ show: "false", msg: "" });
  const [query, setQuery]= useState("thor");

  const getMovie = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if (data.Response === "True") {
        setIsLoading(false);
        setMovie(data.Search);
      } else {
        setIsError({
          show: true,
          msg: data.Error,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
   let timerOut = setTimeout(()=>{
   getMovie(`${API_URL}&s=${query}`);
    },400)
    return () => clearTimeout(timerOut);
  }, [query]);
  return (
    <AppContext.Provider value={{ isloading, iserror, movie, query, setQuery }}>
      {children}
    </AppContext.Provider>
  );
};
const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider, useGlobalContext };
