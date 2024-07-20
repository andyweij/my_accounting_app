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
const SidebarMenu = () => {
  return (
    <Container>
      <Row></Row>
      <Nav fill variant='tabs' defaultActiveKey='/home'>
        <Nav.Item>
          <Nav.Link href='/home'>Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey='link-1'>Loooonger NavLink</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey='link-2'>Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey='disabled' disabled>
            Disabled
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Container>
  );
};
export default SidebarMenu;
