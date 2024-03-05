import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../Main/Main';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

function App() {

  return (
    <Routes>
      <Route path="/" element={
        <Main 

        />
      }>
      </Route>
      <Route path="*" element={
        <NotFoundPage />
      }>
      </Route>
    </Routes> 
  )
}

export default App;
