import React from 'react';

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            test: '1'
        }
        setInterval(() => {
            this.setState({
                date: new Date(),
                test: 'setInterval'
            });
        }, 5000);
       /* this.setState({
            date: new Date(),
            test: 'constructor'
        })*/
        console.log("我已经在constructor里将props和state初始化");
    }
    componentWillMount(){
         this.setState({
            date: new Date(),
            test: 'componentWillMount'
        })
        console.log("我要插入了");
    }
    render() {
        /* return <h1>Hello, {this.props.name}</h1>;*/
        /* this.setState({
            date: new Date(),
            test: 'render'
        })*/
         console.log("这里是render");
        return (
            <div>
                <h1>Hello, {this.props.name}</h1>
                <h2>{this.state.date.toString()}</h2>
            </div>
        )
    }
    componentDidMount(){
         this.setState({
            date: new Date(),
            test: 'componentDidMount'
        })
        console.log("已经挂载到页面里了");
    }
    componentWillReceiveProps(){
         this.setState({
            date: new Date(),
            test: 'componentWillReceiveProps'
        })
    }
    shouldComponentUpdate() {
        /* this.setState({
            date: new Date(),
            test: 'shouldComponentUpdate'
        })*/
        return true;
    }
    componentWillUpdate(){
       /*  this.setState({
            date: new Date(),
            test: 'componentWillUpdate'
        })*/
    }
    componentDidUpdate(){
      /*   this.setState({
            date: new Date(),
            test: 'componentDidUpdate'
        })*/
        console.log("更新完毕");
    }
    componentWillUnmount() {
        console.log("要死了");
    }

}

export default Welcome;