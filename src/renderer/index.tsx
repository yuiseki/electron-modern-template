import * as React from "react";
import * as ReactDOM from "react-dom";
const electron = window.require('electron');

declare global {
    interface Window {
      require: any;
    }
}

const ipcRenderer = electron.ipcRenderer;

class MainView extends React.Component {
  render () {
    const style = {
      margin: '0px',
      padding: '0px',
      width: '100%'
    }
    return <div style={style}>
      <HelloWorld />
      <SyncButton />
      <AsyncButton />
    </div>
  }
}

class HelloWorld extends React.Component {
  render () {
    const style = {
      fontSize: '3em',
      width: '100%'
    }
    return (
      <h1>Hello world</h1>
    );
  }
}

class SyncButton extends React.Component {
  onClick () {
    const reply = ipcRenderer.sendSync('sendSync', "hoge");
    console.log('sync return value')
    console.log('\t'+reply)
  }
  render () {
    return (
      <input type='button' value="sync ipc" onClick={this.onClick} />
    )
  }
}

class AsyncButton extends React.Component {
  onClick () {
    ipcRenderer.send('sendAsync', "hoge");
  }
  render () {
    return (
      <input type='button' value="async ipc" onClick={this.onClick} />
    )
  }
}

ipcRenderer.on('onAsyncReply', (event, args) => {
  console.log('ipcRenderer onAsyncReply')
  console.log('\t'+args)
})

ReactDOM.render(<MainView />, document.getElementById("app"));
