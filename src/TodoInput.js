import React, {Component} from 'react';

export default class TodoInput extends Component {
    render(){
        return <input className="content" type="text" defaultValue={this.props.content}
        placeholder="请输入待办事项"
        onChange={this.changeTitle.bind(this)}
        onKeyPress={this.submit.bind(this)}/>  
    }
    submit(e){
        if(e.key === 'Enter') {
            this.props.onSubmit(e);
        }
    }
    changeTitle(e){
        this.props.onChange(e);
    }
}