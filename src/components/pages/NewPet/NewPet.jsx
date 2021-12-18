import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Form, Col, Button } from 'react-bootstrap';
import * as yup from 'yup';

import { useNavigate } from 'react-router-dom';

import TemplatePrivate from '../../templates/TemplatePrivate/TemplatePrivate';

import { createOneNewPet } from '../../../services/api';
import './NewPet.css';

const schema = yup.object().shape({
  name: yup.string().required('Required Field').min(3, 'Minimum of 3 characters').max(100, 'Maximum of 100 characters'),
  description: yup.string().max(100, 'Maximum of 150 characters'),
  photography: yup.string(),
});

const NewPet = () => {
  const [pet, setPet] = useState({});
  const navigate = useNavigate();
  const {
    values, errors, touched, handleBlur, handleChange, handleSubmit, setTouched, setValues,
  } = useFormik({
    initialValues: {
      name: '', description: '', photography: '',
    },
    validationSchema: schema,
    onSubmit: async (formData) => {
      console.log('FORM SUBMETIDO', formData);
      const token = localStorage.getItem('token');
      await createOneNewPet(formData, token);

      // eslint-disable-next-line no-use-before-define
      handleLimpaTudo();
      navigate('/my-pets');
    },

  });

  function handleLimpaTudo() {
    setValues({ name: '', description: '', photography: '' });
    setTouched({ name: 'false', description: 'false', photography: '' });
  }

  return (
    <TemplatePrivate>
      <Form onSubmit={handleSubmit}>

        <Form.Group as={Col} md="12" controlId="new-pet-form">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            isValid={touched.name && !errors.name}
            isInvalid={touched.name && errors.name}
          />
          <Form.Control.Feedback>Ok!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.birthday}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="12" controlId="new-pet-form">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            isValid={touched.description && !errors.description}
            isInvalid={touched.description && errors.description}
          />
          <Form.Control.Feedback>Ok!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="12" controlId="new-pet-form">
          <Form.Label>Photography</Form.Label>
          <Form.Control
            type="text"
            name="photography"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Form.Control.Feedback>Ok!</Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" siz="lg" className="new-pet-submit-button">Create</Button>
      </Form>

    </TemplatePrivate>
  );

};

export default NewPet;
