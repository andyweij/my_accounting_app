
import { initializeApp  } from "firebase/app";
import { getDatabase, ref, set ,child, get  } from "firebase/database";
import { Container, Form, Col, Row, Button ,Table ,Card ,Accordion} from 'react-bootstrap';

const Test = () => {
const firebaseConfig = {
    apiKey: "AIzaSyA0yKuFTNSGZmQo_dq6x27Lb8LzSc7JhqE",
    authDomain: "myaccountingmanagement.firebaseapp.com",
    projectId: "myaccountingmanagement",
    storageBucket: "myaccountingmanagement.appspot.com",
    messagingSenderId: "244066512651",
    databaseURL:'https://myaccountingmanagement-default-rtdb.firebaseio.com',
    appId: "1:244066512651:web:fbccbda7489d17f9783c0e",
    measurementId: "G-Y9V1V0P2Z7"
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(getDatabase());
const testSet=()=>{
    set(ref(db, 'test1/'+2), {
        username: 'jewel',
        email: 'test3'
      });
}
const testGet=()=>{
  get(child(dbRef, `test1/2`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
}
return (
<Container>
<Accordion defaultActiveKey="0">
  <Row>
    <Col>
      <Button variant="success" type="button" onClick={testSet}>測試set</Button>
    </Col>
    <Col>
      <Button variant="primary" type="button" onClick={testGet}>測試get</Button>
    </Col>
  </Row>
  </Accordion>
</Container>
)
}
export default Test;