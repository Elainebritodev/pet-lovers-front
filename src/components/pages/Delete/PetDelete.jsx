import React, { useState, useEffect } from 'react';

import { Link, useParams, useNavigate } from 'react-router-dom';

import TemplatePrivate from '../../templates/TemplatePrivate/TemplatePrivate';

import { deletePet } from '../../../services/api';

import '../NewPet/NewPet.css';

const PetDelete = () => {
  const { petId } = useParams();
  const navigate = useNavigate();
  const deletePetById = async () => {
    try {
      const token = localStorage.getItem('token');
      const petDeleted = await deletePet(petId, token);
      console.log(petDeleted);
      navigate('/my-pets');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TemplatePrivate>
      <h1>
        <strong>Are you sure you want to proceed?</strong>
      </h1>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <button onClick={() => navigate('/my-pets')}>Exit</button>
        <button style={{backgroundColor: 'red'}} onClick={deletePetById}>Delete</button>
      </div>
    </TemplatePrivate>
  );

};

export default PetDelete;
