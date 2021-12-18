import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Form, Col, Button } from 'react-bootstrap';
import * as yup from 'yup';

import { useNavigate, useParams } from 'react-router-dom';

import TemplatePrivate from '../../templates/TemplatePrivate/TemplatePrivate';

import { editOnePet } from '../../../services/api';
import '../NewPet/NewPet.css';

const schema = yup.object().shape({
  name: yup.string(),
  description: yup.string().max(100, 'Maximum of 150 characters'),
  photography: yup.string(),
});

const EditPet = () => {
  const { petId } = useParams();
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
      await editOnePet(formData, petId, token);

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
      <h1>Edit Form</h1>
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
            value={values.description}
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
            value={values.photography}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Form.Control.Feedback>Ok!</Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" siz="lg" className="new-pet-submit-button">Edit</Button>
      </Form>

    </TemplatePrivate>
  );

};

export default EditPet;
