import {
  Container,
  Col,
  Row,
  Button,
  Table,
  Card,
  InputGroup,
  Form,
  FormLabel,
  ButtonToolbar,
  Glyphicon,
  FormControl,
  ButtonGroup,
} from 'react-bootstrap';
import Link from '@mui/material/Link';
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import { getDatabase, ref, set, child, get, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';
const AccountRecord = () => {
  return (
    <Container>
      <Form>
        <h2>
          <FormLabel>記帳</FormLabel>
        </h2>
        <Form.Group controlId='exampleForm.ControlInput1'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='name@example.com' />
        </Form.Group>
        <Form.Group controlId='exampleForm.ControlSelect1'>
          <Form.Label>Example select</Form.Label>
          <Form.Control as='select'>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='exampleForm.ControlSelect2'>
          <Form.Label>Example multiple select</Form.Label>
          <Form.Control as='select' multiple>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='exampleForm.ControlTextarea1'>
          <Form.Label>Example textarea</Form.Label>
          <Form.Control as='textarea' rows={3} />
        </Form.Group>
      </Form>
    </Container>
  );
};
export default AccountRecord;
