import {
  Container,
  Col,
  Row,
  Button,
  Table,
  Card,
  InputGroup,
  Form,
} from 'react-bootstrap';
import Link from '@mui/material/Link';
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import { getDatabase, ref, set, child, get, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';
const UserLogin = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyA0yKuFTNSGZmQo_dq6x27Lb8LzSc7JhqE',
    authDomain: 'myaccountingmanagement.firebaseapp.com',
    projectId: 'myaccountingmanagement',
    storageBucket: 'myaccountingmanagement.appspot.com',
    messagingSenderId: '244066512651',
    databaseURL: 'https://myaccountingmanagement-default-rtdb.firebaseio.com',
    appId: '1:244066512651:web:fbccbda7489d17f9783c0e',
    measurementId: 'G-Y9V1V0P2Z7',
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const dbRef = ref(getDatabase());
  const [userInfo, setUserInfo] = useState({
    userName: '',
    userPwd: '',
    userId: '',
    phoneNum: '',
  });
  const [userCount, setUserCount] = useState(0);
  const changeUserInfo = e => {
    const { name, value } = e.target;
    setUserInfo(u => ({ ...u, [name]: value }));
  };

  const createUser = e => {
    // e.preventDefault();
    get(child(dbRef, `USER/`))
      .then(snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          let count = data.length;
          set(ref(db, 'USER/' + count), {
            userInfo,
          });
        } else {
          console.log('No data available');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <Container fluid='sm'>
      <Row height='100%'>&nbsp;</Row>
      <Row height='100%'>&nbsp;</Row>
      <Row height='100%'>&nbsp;</Row>

      <Form>
        <Form.Group as={Row} className='mb-3' controlId='userId'>
          <Col></Col>
          <Form.Label column sm='2'>
            使用者名稱:
          </Form.Label>
          <Col sm='5'>
            <Form.Control
              type='text'
              placeholder='王小名'
              onChange={changeUserInfo}
              name='userName'
            />
          </Col>
          <Col></Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3' controlId='pwd'>
          <Col></Col>
          <Form.Label column sm='2'>
            密碼:
          </Form.Label>
          <Col sm='5'>
            <Form.Control
              type='password'
              placeholder='Password'
              onChange={changeUserInfo}
              name='userPwd'
            />
          </Col>
          <Col></Col>
        </Form.Group>
        <Row>
          <Col> </Col>
          <Col>
            {' '}
            <Button variant='primary' onClick={createUser}>
              建立使用者
            </Button>
          </Col>
          <Col></Col>
        </Row>
      </Form>
    </Container>
  );
};
export default UserLogin;
