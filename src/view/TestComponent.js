import React, { Component } from 'react';
import TestProps from './TestProps';
import { Item } from 'semantic-ui-react';

const callbackFetchPostsData = (callback, userID) => {
  fetch('https://jsonplaceholder.typicode.com/posts/' + userID)
    // 此處為非同步回傳
    .then(rs => rs.json())
    // 須加.then接收回傳結果
    .then(userData => {
      console.log(userData);
      callback(userData);
    })
    .catch(error => {
      console.log(error);
    });
};

const point = [1, 2, 3, 4, 5];
const [x, y, ...rest] = point;
console.log('x:', x);
console.log('y:', y);
console.log('rest:', rest);
callbackFetchPostsData(user => {
  console.log('FetchCallbackCusFun:', user);
}, 2);

class List extends Component {
  state = {
    title: '我是Title',
    text: '我是Text',
    count: 0,
  };
  // 1.透過建構式再綁定回組件 bind(this)
  constructor() {
    super();
    // 透過建構式綁定函數傳入this組件bind(this)
    this.updateState = this.updateState.bind(this);
  }

  updateState() {
    this.setState({
      text: 'bind綁定',
      count: this.state.count + 1,
    });
  }
  //   updateState = () => {
  //     this.setState({ text: '箭頭函式', count: this.state.count + 1 });
  //   };
  render() {
    const { title } = this.state;
    return (
      <div>
        <p>123</p>
        <button>updateState</button>
        <div>
          <h1>{title}</h1>
          <h1>{this.state.text}</h1>
          <h1>{this.state.count}</h1>
          <button style={{backgroundColor:'Red'}} onClick={this.updateState}>Add Count</button>
          <br />
          <br />
          <TestProps text='test' />
        </div>
      </div>
    );
  }
}
export default List;
