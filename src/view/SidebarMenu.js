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
  Nav,
} from 'react-bootstrap';
import {
  SidebarPusher,
  SidebarPushable,
  MenuItem,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react';
import MyCalendar from './MyCalendar';
import TestComponent from './TestComponent.js';
import AccountDonut from './AccountDonut.js';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
const SidebarMenu = () => {
  return (
    <Container>
      <Row></Row>
      <Nav fill variant='tabs'>
        <Nav.Item>
          <Nav.Link as={Link} eventKey='home' to='/home'>
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} eventKey='MyCalendar' to='/MyCalendar'>
            MyCalendar
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} eventKey='AccountDonut' to='/AccountDonut'>
            AccountDonut
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Routes>
        <Route path='MyCalendar' element={<MyCalendar />} />
        <Route path='home' element={<TestComponent />} />
        <Route path='AccountDonut' element={<AccountDonut />} />
      </Routes>
    </Container>
  );
};
export default SidebarMenu;
