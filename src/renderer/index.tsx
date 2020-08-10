import * as React from "react";
import * as ReactDOM from "react-dom";
const electron = window.require('electron');

declare global {
    interface Window {
      require: any;
    }
}

const ipcRenderer = electron.ipcRenderer;

const MainView: React.FC = () => {
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

const HelloWorld: React.FC = () => {
    const style = {
      fontSize: '3em',
      width: '100%'
    }
    return (
      <h1>Hello world</h1>
    );
}

const SyncButton: React.FC = () => {
  function onClick () {
    const reply = ipcRenderer.sendSync('sendSync', "hoge");
    console.log('sync return value')
    console.log('\t'+reply)
  }

  return (
    <input type='button' value="sync ipc" onClick={() => {onClick()}} />
  )
}

const AsyncButton: React.FC = () => {
  function onClick () {
    ipcRenderer.send('sendAsync', "hoge");
  }
  return (
    <input type='button' value="async ipc" onClick={() => {onClick()}} />
  )
}

ipcRenderer.on('onAsyncReply', (event, args) => {
  console.log('ipcRenderer onAsyncReply')
  console.log('\t'+args)
})

ReactDOM.render(<MainView />, document.getElementById("app"));
