import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Form, Col, Button } from 'react-bootstrap';
import * as yup from 'yup';

import { useNavigate, useParams } from 'react-router-dom';

import TemplatePrivate from '../../templates/TemplatePrivate/TemplatePrivate';

import { getOnePet, editOnePet } from '../../../services/api';
import '../NewPet/NewPet.css';

// const schema = yup.object().shape({
//   name: yup.string().required('Required Field').min(3, 'Minimum of 3 characters').max(100, 'Maximum of 100 characters'),
//   description: yup.string().max(100, 'Maximum of 150 characters'),
//   photography: yup.string(),
// });

const EditPet = () => {
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
  console.log(pet);
  const navigate = useNavigate();
  // const {
  //   values, errors, touched, handleBlur, handleChange, handleSubmit, setValues,
  // } = useFormik({
  //   initialValues: {
  //     name: pet.name, description: pet.description, photography: pet.photography },
  //   validationSchema: schema,
  //   onSubmit: async (formData) => {
      // console.log('FORM SUBMETIDO', formData);
      // const token = localStorage.getItem('token');
      // await editOnePet(formData, petId, token);

      // // eslint-disable-next-line no-use-before-define
      // // handleLimpaTudo();
      // navigate('/my-pets');
  //   },

  // });

  const handleChange = (event) => {
    setPet({...pet,[event.target.name] : event.target.value})
  };
console.log(petId);
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log('PET!!!!', pet);
      const tokenEdit = localStorage.getItem('token');
      console.log(tokenEdit);
      await editOnePet(petId, pet, tokenEdit);
      console.log('FORM SUBMETIDO', pet);

    // eslint-disable-next-line no-use-before-define
    // handleLimpaTudo();
    navigate('/my-pets');

      
    } catch (error) {
      console.log(error);
      
    }
  };

  // function handleLimpaTudo() {
  //   setValues({ name: '', description: '', photography: '' });
  //   setTouched({ name: 'false', description: 'false', photography: '' });
  // }

  return (
    <TemplatePrivate>
      <Form onSubmit={handleSubmit}>

        <Form.Group as={Col} md="12" controlId="new-pet-form">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={pet.name}
            onChange={handleChange}
            // onBlur={handleBlur}
            // isValid={touched.name && !errors.name}
            // isInvalid={touched.name && errors.name}
          />
          {/* <Form.Control.Feedback>Ok!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.birthday}</Form.Control.Feedback> */}
        </Form.Group>

        <Form.Group as={Col} md="12" controlId="new-pet-form">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={pet.description}
            onChange={handleChange}
            // onBlur={handleBlur}
            // isValid={touched.description && !errors.description}
            // isInvalid={touched.description && errors.description}
          />
          {/* <Form.Control.Feedback>Ok!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback> */}
        </Form.Group>

        <Form.Group as={Col} md="12" controlId="new-pet-form">
          <Form.Label>Photography</Form.Label>
          <Form.Control
            type="text"
            name="photography"
            value={pet.photography}
            onChange={handleChange}
            // onBlur={handleBlur}
          />
          {/* <Form.Control.Feedback>Ok!</Form.Control.Feedback> */}
        </Form.Group>

        <Button type="submit" siz="lg" className="edit-pet-submit-button">Edit</Button>
      </Form>

    </TemplatePrivate>
  );

};

export default EditPet;
