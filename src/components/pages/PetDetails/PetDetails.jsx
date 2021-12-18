import React, { useState, useEffect } from 'react';

import { Link, useParams } from 'react-router-dom';

import TemplatePrivate from '../../templates/TemplatePrivate/TemplatePrivate';

import { getOnePet } from '../../../services/api';

import './PetDetails.css';

const MyPets = () => {
  const [pet, setPet] = useState({});
  const { petId } = useParams();

  const getPetById = async () => {
    try {
      const token = localStorage.getItem('token');
      const foundPet = await getOnePet(petId, token);
      setPet(foundPet);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPetById();
  }, []);

  return (
    <TemplatePrivate>
      <Link className='pet-card' to='anything'>
        <img src='http://especiais.estadao.com.br/portal-animal/wp-content/uploads/sites/8/2016/01/iStock_000018342486_Medium-1-630x420.jpg'></img>
        <h1><strong>Pet</strong></h1>
      </Link>
      <h1>
        <strong>Name:</strong>
        {pet.name}
      </h1>

      <h1>
        <strong>Description:</strong>
        {pet.description}
      </h1>
      <Link to={`/my-pets-edit/${petId}`}>
        <h1><strong>Edit</strong></h1>
      </Link>

    </TemplatePrivate>
  );

};

export default MyPets;
