import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../Main/Main';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { currentUser, userId } from '../../utils/constants';

function App() {
  const [userData, setUserData] = React.useState({ name: currentUser, id: userId, jwt: ''});

  return (
    <Routes>
      <Route path="/" element={
        <Main currentUser={userData}

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
