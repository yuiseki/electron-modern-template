'use strict'

import { app, BrowserWindow, Tray, Menu, globalShortcut, ipcMain } from 'electron'
import * as path from 'path'
import { format as formatUrl } from 'url'

const isDevelopment = process.env.NODE_ENV !== 'production'
declare const __dirname: string;
declare const __static: string;

const appName = 'electron-modern-template'

// GCされないように各オブジェクトをGlobalで保持する
let mainWindow
let trayIcon

function createMainWindow() {
  const window = new BrowserWindow({
    width: 1000,
    height: 800,
    // 枠なし、タイトルバーなしのWindowにする場合
    //frame: false,
    //titleBarStyle: 'hidden',
    // 透過させる場合
    //transparent: true,
    // タスクバーにアイコンを表示しない場合
    //skipTaskbar: true,
    webPreferences: {nodeIntegration: true}
  })
  window.setTitle(appName)

  if (isDevelopment) {
    window.webContents.openDevTools()
  }

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
  }
  else {
    window.loadURL(formatUrl({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true
    }))
  }

  window.on('closed', () => {
    mainWindow = null
  })

  // Windowからフォーカスが外れた時の処理
  window.on('blur', () => {
    console.log("main window blue")
  })

  return window
}

function showTrayIcon() {
  const trayIconPath = path.resolve(__static, "icon.png")
  trayIcon = new Tray(trayIconPath)
  trayIcon.setToolTip(appName)
  trayIcon.setContextMenu(Menu.buildFromTemplate([
    {
      label: 'Quit',
      click (menuIton) {
        app.quit()
      }
    }
  ]))
  trayIcon.on('click', () => {
    mainWindow = createMainWindow()
  })
}

function setGlobalShortcut() {
  globalShortcut.register('Shift+Ctrl+L', () => {
    mainWindow = createMainWindow();
  });
}

app.on('window-all-closed', () => {
})

app.on('activate', () => {
})

app.on('ready', () => {
  showTrayIcon()
  setGlobalShortcut();
  mainWindow = createMainWindow();
})

ipcMain.on('sendSync', (event, args) => {
  console.log('ipcMain sendSync')
  console.log('\t'+args)
  event.returnValue = 'huga'
})

ipcMain.on('sendAsync', (event, args) => {
  console.log('ipcMain sendAsync')
  console.log('\t'+args)
  event.reply('onAsyncReply', 'huga')
})