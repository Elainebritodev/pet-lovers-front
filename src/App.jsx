import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';

import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import MyPets from './components/pages/MyPets/MyPets';
import PetDetails from './components/pages/PetDetails/PetDetails';
import NewPet from './components/pages/NewPet/NewPet';
import EditPet from './components/pages/Edit/EditPet';
import PetDelete from './components/pages/Delete/PetDelete';

import ProtectedRoute from './components/miscelaneous/ProtectedRoute/ProtectedRoute';

const App = () => {
  const verifyLoggedUser = () => {
    const token = localStorage.getItem('token');

    return !!token; // dois pontos exclamação converte para booleans (aqui poderia ser um ternário)
  };

  const [isUserLogged, setIsUserLogged] = useState(verifyLoggedUser());
  console.log(isUserLogged);
  const loginUser = () => {
    setIsUserLogged(true);
  };

  return (
    <Routes>
      <Route path="/" element={<Login loginUser={loginUser} />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/my-pets"
        element={<ProtectedRoute isLogged={isUserLogged} Page={MyPets} />}
      />

      <Route
        path="/my-pets/:petId"
        element={<ProtectedRoute isLogged={isUserLogged} Page={PetDetails} />}
      />

      <Route
        path="/my-pets-new"
        element={<ProtectedRoute isLogged={isUserLogged} Page={NewPet} />}
      />

      <Route
        path="/my-pets-edit/:petId"
        element={<ProtectedRoute isLogged={isUserLogged} Page={EditPet} />}
      />

      <Route
        path="/my-pets-delete/:petId"
        element={<ProtectedRoute isLogged={isUserLogged} Page={PetDelete} />}
      />
    </Routes>
  );

};

export default App;
