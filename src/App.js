import React, { Component } from 'react';
import 'normalize.css';
import './reset.css'
import './App.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      newTodo: '',
      todoList: [
        /*{ id: 1, title: '第一个待办事项' },
        { id: 2, title: '第二个待办事项' }*/
      ]
    }
  }
  render() {
    let todos = this.state.todoList.map((item, index)=>{
      return (
        <li className="item" key={index}>
          <TodoItem todo={item}/>
        </li>
      )
    })
    return (
      <div className="App">
        <div id="header">
          <h1>我的待办事项</h1>
        </div>
        <div className="inputWrapper">
         <TodoInput content={this.state.newTodo} onSubmit={this.addTodo.bind(this)}/>
        </div>
        <ol className="todoList">
          {todos}
        </ol>
      </div>
    )
  }
  addTodo(e){
   // console.log('添加一个TODO了');
   this.state.todoList.push({
     id: idMaker(),
     title: e.target.value,
     status: null,
     deleted: false
   })
   this.setState({
     newTodo: '',
     todoList: this.state.todoList
   })
  }
}

export default App;

let id = 0;
function idMaker(){
  id += 1;
  return id;
}
