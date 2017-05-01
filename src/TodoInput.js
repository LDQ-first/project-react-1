import React, {Component} from 'react';

export default class TodoInput extends Component {
    render(){
        return <input className="content" type="text" defaultValue={this.props.content}
        onChange={this.changeTitle.bind(this)}
        onKeyPress={this.submit.bind(this)}/>  
    }
    submit(e){
        if(e.key === 'Enter') {
            //console.log('用户按了回车');
            this.props.onSubmit(e);
        }
    }
    changeTitle(e){
        this.props.onChange(e);
    }
}