import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import {
  Form, Col, FormGroup, FormControl,
} from 'react-bootstrap';

import TemplatePrivate from '../../templates/TemplatePrivate/TemplatePrivate';
import Toast from '../../miscelaneous/Toast/Toast';

import { getPets } from '../../../services/api';

import './MyPets.css';

const MyPets = () => {
  const [show, setShow] = useState(false);
  const [pets, setPets] = useState([]);
  const [searchName, setSearchName] = useState('');

  const getPetByName = async () => {
    try {
      const token = localStorage.getItem('token');
      const foundPets = await getPets(searchName, token);

      setPets(foundPets);
      // se der algum erro diferente do 401, vai cair no catch abaixo;
      // se for o 401 cai no interceptor do axios na rota api.js
    } catch (error) {
      setShow(true);
    }
  };

  const handleChange = async (e) => {
    setSearchName(e.target.value);
  };

  useEffect(() => {
    getPetByName();
  }, [searchName]);

  return (
    <TemplatePrivate>
      <Form.Group as={Col} md="12" controlId="login-form">
        <Form.Control
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={handleChange}
        />
      </Form.Group>

      <div className="pets-conteiner">
        {pets.map((pet) => (
          <Link className="pets-card" key={pet._id} to={`/my-pets/${pet._id}`}>
            <p>{pet.name}</p>
            <div className="card" style={{ width: "18rem" }}>
              <img src={pet.photography} className="card-img" alt="..." />
            </div>
          </Link>
        ))}
      </div>

      <Toast
        variant="danger"
        message="An Error Has Occurred"
        show={show}
        setShow={setShow}
      />
    </TemplatePrivate>
  );
};

export default MyPets;
