import * as React from "react";
import * as ReactDOM from "react-dom";

class MainView extends React.Component {
  render () {
    const style = {
      margin: '0px',
      padding: '0px',
      width: '100%'
    }
    return <div style={style}>
      <HelloWorld />
    </div>
  }
}

class HelloWorld extends React.Component {
  render() {
    const style = {
      fontSize: '3em',
      width: '100%'
    }
    return (
      <h1>Hello world</h1>
    );
  }
}


ReactDOM.render(<MainView />, document.getElementById("app"));
