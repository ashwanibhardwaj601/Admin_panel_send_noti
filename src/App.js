import React from 'react';
import Login from './Login';
import { Route, Routes } from 'react-router-dom';
import Signup from './Signup';
import Useroutlet from './Useroutlet';
import Pushnotification from './Pushnotification';

const App = () => {
  return (
    <Routes>
      <Route element={<Useroutlet />}>
        <Route path="/" element={<Pushnotification />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default App;
