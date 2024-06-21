import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, child, get, onValue } from 'firebase/database';
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
import { useState } from 'react';
const Test = () => {
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
    email: '',
    userId: '',
    phoneNum: '',
  });

  const onChangeValue = e => {
    const { name, value } = e.target;
    setUserInfo(u => ({ ...u, [name]: value }));
  };
  const testSet = e => {
    console.log(userInfo);
    set(ref(db, 'USER/' + 1), {
      userInfo,
    });
    console.log(userInfo);
  };
  const [users, setUsers] = useState([{}]);
  const testGet = () => {
    setUsers([]);
    const starCountRef = ref(db, 'USER/');

    onValue(starCountRef, snapshot => {
      if (snapshot.exists) {
        const data = snapshot.val();
        const usersArray = Object.keys(data).map(key => data[key].userInfo);
        setUsers(usersArray);
      }
      {
        console.log('No data available');
      }
    });
    // get(child(dbRef, `test1/2`))
    //   .then(snapshot => {
    //     if (snapshot.exists()) {
    //       console.log(snapshot.val());
    //       setName(snapshot.val().username);
    //     } else {
    //       console.log('No data available');
    //     }
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
  };
  return (
    <Container>
      <Row>
        <Col>
          <Button variant='success' type='button' onClick={testSet}>
            測試set
          </Button>
        </Col>
        <Col>
          <InputGroup className='mb-3'>
            <Form.Control
              name='userName'
              placeholder='userName'
              aria-label='userName'
              aria-describedby='basic-addon1'
              onChange={onChangeValue}
            />
          </InputGroup>
        </Col>
        <Col>
          <InputGroup className='mb-3'>
            <Form.Control
              name='email'
              placeholder='email'
              aria-label='email'
              aria-describedby='basic-addon1'
              onChange={onChangeValue}
            />
          </InputGroup>
        </Col>
        <Col>
          <InputGroup className='mb-3'>
            <Form.Control
              name='phoneNum'
              placeholder='phoneNum'
              aria-label='phoneNum'
              aria-describedby='basic-addon1'
              onChange={onChangeValue}
            />
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant='primary' type='button' onClick={testGet}>
            測試get
          </Button>
        </Col>
        <Col>
          {users.length === 0 ? (
            <p>No users available</p>
          ) : (
            <Form.Select aria-label='Default select example'>
              {users.map((u, index) => (
                <option key={index} value={u.userName}>
                  {u.userName}
                </option>
              ))}
            </Form.Select>
          )}
        </Col>
      </Row>
    </Container>
  );
};
export default Test;
