import { useState, useEffect } from 'react';
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

const MyCalendar = () => {
  const weekDays = { nl: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] };
  const [monthOfDays, setMonthOfDays] = useState([]);

  const formatDate = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth(); // Months are zero-based
  const initMonth = () => {
    // const day = String(date.getDate()).padStart(2, '0');
    let lastDayInMonth = getDaysInMonth(year, month + 1);
    const days = [[], [], [], [], [], []];
    let count = 0;
    for (let i = 1; i <= lastDayInMonth; i++) {
      for (let j = 0; j < weekDays.nl.length; j++) {
        const day = new Date(year, month, i);
        const dayOfWeek = day.getDay();
        if (dayOfWeek == j || (j == 0 && dayOfWeek % 7 == 0)) {
          days[count].push(i);
          break;
        }

        if (count == 0 && i % 7 == 1) {
          days[count].push('');
        }
      }
      if (days[count].length == weekDays.nl.length) count++;
    }
    console.log(days);
    setMonthOfDays(days);
    // console.log(days);
  };
  useEffect(() => {
    initMonth();
  }, []); // 依赖数组为空，只在组件初次渲染时调用

  return (
    <Container className='d-flex justify-content-center mt-5 '>
      <Table striped bordered hover>
        <thead>
          <tr style={{ textAlign: 'center' }}>
            <th colSpan={weekDays.nl.length}>{month + 1}月</th>
          </tr>
          <tr>
            {weekDays.nl.map((w, index) => (
              <th key={index} style={{ textAlign: 'center' }}>
                {w}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {monthOfDays.map((m, index) => (
            <tr key={index}>
              {m.map((mm, subIndex) => (
                <td key={subIndex}>{mm}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default MyCalendar;
