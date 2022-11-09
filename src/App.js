import React from 'react';
import Home from './Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SingleMovies from './SingleMovies';
import Error from './Error';


const App =()=> {
  return (
    <BrowserRouter>
    <Routes>

      <Route path="/" element={<Home/>}/>
      <Route path="movie/:id" element={<SingleMovies/>}/>
      <Route path="*" element={<Error/>}/>



    </Routes>
    </BrowserRouter>
  );
}

export default App;
