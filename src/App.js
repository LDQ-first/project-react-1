import React, { Component } from 'react';
import 'normalize.css';
import './reset.css'
import './App.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import UserDialog from './UserDialog';
import AV, { getCurrentUser, signOut } from './leanCloud';
import { copy } from './copy'



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: getCurrentUser() || {},
      newTodo: '',
      todoList: []
    }
  }

  render() {
    let todos = this.state.todoList
      .filter((item) => !item.deleted)
      .map((item, index) => {
        return (
          <li className="item" key={index}>
            <TodoItem todo={item} id={"todo-" + index} onToggle={this.toggle.bind(this)}
              onDelete={this.delete.bind(this)} />
          </li>
        )
      })
    return (
      <div className="App">
        <div id="header">
          <h1>{this.state.user.username || '我'}的待办事项
            {this.state.user.id ? <button onClick={this.signOut.bind(this)}>登出</button> : null}
          </h1>
        </div>
        <div className="inputWrapper">
          <TodoInput content={this.state.newTodo}
            onChange={this.changeTitle.bind(this)}
            onSubmit={this.addTodo.bind(this)}
            />
        </div>
        <ol className="todoList">
          {todos}
        </ol>
        {this.state.user.id ? null :
          <UserDialog
            onSignUp={this.onSignUpOrSignIn.bind(this)}
            onSignIn={this.onSignUpOrSignIn.bind(this)} />}
      </div>
    )
  }
  signOut() {
    signOut();
    let stateCopy = copy(this.state);
    stateCopy.user = {};
    stateCopy.todoList = [];
    this.setState(stateCopy);
  }
  onSignUpOrSignIn(user) {
    let stateCopy = copy(this.state);
    stateCopy.user = user;
    this.setState(stateCopy);
    this.fetchData();
  }
  componentWillMount() {
    
  }
  componentDidMount() {
   
  }
  componentDidUpdate() {

  }
  saveData() {
    var SaveObject = AV.Object.extend('SaveObject');
    var saveObject = new SaveObject();

    var acl = new AV.ACL();
    acl.setReadAccess(AV.User.current(),true);
    acl.setWriteAccess(AV.User.current(), true);

    saveObject.set('content', this.state);
    saveObject.setACL(acl);
    saveObject.save().then((todo) => {
      let stateCopy = copy(this.state);
      stateCopy.todoList.id = todo.id;
      this.setState(stateCopy)
      console.log(todo.id);
      console.log('保存成功');
    }, (error) => {
      alert('保存失败');
    })
  }
  updateData() {
    var todo = AV.Object.createWithoutData('SaveObject', this.state.todoList.id);
    todo.set('content', this.state);
    todo.save().then(() => {
      console.log('update success');
    }, (error) => {
        console.log('update fail');
      });
  }
  changeData(){
    this.state.todoList.id ? this.updateData() : this.saveData();
  }
  fetchData() {
    if(this.state.user.id) {
      var query = new AV.Query('SaveObject');
      query.find().then((todo)=> {
        let stateCopy = copy(this.state);
        stateCopy.todoList = todo[0].attributes.content.todoList;
        stateCopy.todoList.id = todo[0].id;
        this.setState(stateCopy);
      }, (error) => {
        console.log('fetch fail');
      })
    }
  }
  addTodo(e) {
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
    this.changeData();
    console.log('addTodo');
  }
  changeTitle(e) {
    this.setState({
      newTodo: e.target.value,
      todoList: this.state.todoList
    })
  }
  toggle(e, todo) {
    todo.status = todo.status === 'completed' ? '' : 'completed';
    this.setState(this.state);
    this.changeData();
    console.log('toggle');
  }
  delete(e, todo) {
    todo.deleted = true;
    this.setState(this.state);
    this.changeData();
    console.log('delete');
  }
}

export default App;

let id = 0;
function idMaker() {
  id += 1;
  return id;
}
