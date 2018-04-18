// this part is the same as the component defined in HelloComponent.js
class HelloComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentTime: new Date()
    };
  }
  componentDidMount () {
    setInterval(() => this.tick(), 200);
  }
  tick () {
    this.setState({ currentTime: new Date() });
  }
  render () {
    const timeStr = this.state.currentTime.getHours() + ':' + this.state.currentTime.getMinutes() + ':' + this.state.currentTime.getSeconds();
    return React.createElement('div', null, 'Hello ' + this.props.toWhat + '. The time is ' + timeStr + '.');
  }
}

// this line is required to get the component up and running
ReactDOM.hydrate(React.createElement(HelloComponent, { toWhat: 'World' }), document.getElementById("app"));

