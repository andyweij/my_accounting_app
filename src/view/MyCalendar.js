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
  Nav,
  Glyphicon,
  FormControl,
  ButtonGroup,
  Modal,
} from 'react-bootstrap';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';
import {
  createAccountRecord,
  createItem,
  getDataByDay,
  getItemList,
  removeItemData,
} from '../util/UtilFireBase';
import { FaPlus, FaMinus } from 'react-icons/fa';

const MyCalendar = () => {
  const [show, setShow] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDay,
  });
  const [subject, setSubject] = useState([]);
  useEffect(() => {
    const setItems = async () => {
      const subjects = await getItemList();
      Object.entries(subjects).map(o => {
        if (o[0] == '類別') {
          setSubject(o[1].data);
        }
      });
    };
    setItems();
  }, [subject.length]);

  const [newItem, setNewItem] = useState('');

  const weekDays = { nl: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] };
  const [monthOfDays, setMonthOfDays] = useState([]);
  const [infoCard, setInfoCard] = useState([]);
  useEffect(() => {}, [infoCard]);
  const [account, setAccount] = useState({
    amount: 0,
    item: '',
    ps: '',
  });

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const initMonth = (year, month) => {
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
    setMonthOfDays(days);
  };
  const changeDate = e => {
    let selectDate = e.target.value;
    let date = selectDate.split('-');
    setCurrentMonth(parseInt(date[1]) - 1);
    setCurrentYear(date[0]);
  };
  const preMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  const getDataByDate = async e => {
    let day = e.target.value;
    let month =
      currentMonth + 1 < 10 ? '0' + (currentMonth + 1) : currentMonth + 1;
    let yearMonth = currentYear + month;
    let result = await getDataByDay({
      path: 'account',
      date: yearMonth,
      day: day,
    });
    setSelectedDate({ year: currentYear, month: month, day: day });
    setInfoCard(result);
    setShow(true);
  };
  const addItem = e => {
    createItem('item/類別', newItem);
    setSubject(list => [...list, newItem]);
    setNewItem('');
  };
  const removeItem = async e => {
    subject.splice(account.item, 1);
    removeItemData(subject);
    setSubject(subject);
    initSelected();
  };
  useEffect(() => {
    initMonth(currentYear, currentMonth);
  }, [currentYear, currentMonth]); // 依赖数组为空，只在组件初次渲染时调用
  const [activeKey, setActiveKey] = useState('#');

  const handleSelect = selectedKey => {
    setActiveKey(selectedKey);
  };

  const handleAmountChange = e => {
    if (e.target.id === 'itemSelect') {
      setAccount(prevAccount => ({
        ...prevAccount,
        item: e.target.value,
      }));
    } else if (e.target.id === 'amount') {
      setAccount(prevAccount => ({
        ...prevAccount,
        amount: e.target.value,
      }));
    } else if (e.target.id === 'ps') {
      setAccount(prevAccount => ({
        ...prevAccount,
        ps: e.target.value,
      }));
    }
  };
  const initSelected = () => {
    setAccount(prevAccount => ({
      ...prevAccount,
      item: 0,
    }));
  };
  const addAccountingRecord = e => {
    if (account.item === '') {
      alert('請選擇類別');
      return;
    } else if (parseInt(account.amount) === 0) {
      alert('請輸入金額');
      return;
    }
    let month =
      currentMonth + 1 < 10 ? '0' + (currentMonth + 1) : currentMonth + 1;
    const createRs = createAccountRecord({
      collection: currentYear + month,
      day: selectedDate.day,
      data: account.amount,
      ps: account.ps,
      item: subject[account.item],
    });
    if (createRs) {
      setAccount({ amount: 0, item: '', ps: '' });
      setShow(false);
    } else {
      alert('新增錯誤');
    }
  };

  const handleClose = () => setShow(false);

  return (
    <Container className='d-flex justify-content-center mt-5 '>
      <Table striped bordered hover>
        <thead>
          <tr style={{ textAlign: 'center', backgroundColor: 'yellowgreen' }}>
            <th colSpan={weekDays.nl.length}>
              {' '}
              <a href='#' onClick={preMonth}>
                <BiSolidLeftArrow />
              </a>
              <input
                type='month'
                style={{
                  textAlign: 'center',
                  borderRadius: 10,
                  padding: 5,
                  fontsize: 16,
                }}
                size={1}
                value={
                  currentYear +
                  '-' +
                  (currentMonth + 1 < 10
                    ? '0' + (currentMonth + 1)
                    : currentMonth + 1)
                }
                onChange={changeDate}
              />
              <a href='#' onClick={nextMonth}>
                <BiSolidRightArrow />
              </a>
            </th>
          </tr>
          <tr
            style={{
              textAlign: 'center',
              backgroundColor: 'burlywood',
            }}
          >
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
                <td key={subIndex}>
                  <Button
                    variant='link'
                    onClick={getDataByDate}
                    value={mm}
                    style={{
                      width: '100%',
                      height: '100%',
                      color: 'black',
                      border: 'none',
                      background: 'none',
                    }}
                  >
                    {mm}
                  </Button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>帳務紀錄</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Header as='h5'>項目</Card.Header>
            <Card.Body>
              <Card.Title></Card.Title>
              {Object.entries(infoCard).map(([category, details]) => (
                <div key={category}>
                  <span>{category}</span>
                  {Object.entries(details).map(([item, prices]) => (
                    <div key={item}>
                      <ul>
                        <strong>{item}:</strong>
                        {prices.reduce((total, p) => {
                          return (total += p);
                        })}
                        元
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </Card.Body>
          </Card>
          <br />
          <Nav variant='tabs' activeKey={activeKey} onSelect={handleSelect}>
            <Nav.Item>
              <Nav.Link href='#'>支出</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='link-1'>收入</Nav.Link>
            </Nav.Item>
          </Nav>
          {activeKey === '#' && (
            <Form>
              <Form.Group className='mb-3' controlId='amount'>
                <Form.Label>金額</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='0.0'
                  autoFocus
                  value={account.amount}
                  onChange={handleAmountChange}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='itemSelect'>
                <Form.Label>類別</Form.Label>
                <InputGroup>
                  <Form.Control
                    as='select'
                    onChange={handleAmountChange}
                    value={account.item}
                  >
                    <option value={''}>請選擇</option>
                    {subject.map((item, index) => (
                      <option key={index} value={index}>
                        {item}
                      </option>
                    ))}
                  </Form.Control>
                  <InputGroup.Text id='inputGroup-sizing-default'>
                    <Button
                      variant='link'
                      style={{
                        padding: '0',
                        margin: '0',
                        border: 'none',
                        height: '100%',
                      }}
                      onClick={removeItem}
                    >
                      <FaMinus />
                    </Button>
                  </InputGroup.Text>
                </InputGroup>

                <br />
                <InputGroup className='mb-3'>
                  <FormControl
                    placeholder='新增類別'
                    aria-label='Default'
                    aria-describedby='inputGroup-sizing-default'
                    value={newItem}
                    onChange={e => setNewItem(e.target.value)}
                  />{' '}
                  <InputGroup.Text id='inputGroup-sizing-default'>
                    <Button
                      variant='link'
                      style={{
                        padding: '0',
                        margin: '0',
                        border: 'none',
                        height: '100%',
                      }}
                      onClick={addItem}
                    >
                      <FaPlus />
                    </Button>
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Form.Group className='mb-3' controlId='ps'>
                <Form.Label>備註</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={3}
                  onChange={handleAmountChange}
                />
              </Form.Group>
            </Form>
          )}
          {activeKey === 'link-1' && <div></div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={addAccountingRecord}>
            新增
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MyCalendar;
