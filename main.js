const { app, BrowserWindow, ipcMain} = require('electron');
const osc = require('oscsocket');
const pinger = require('./pinger.js');
const sock = new osc.OSCSocket();

let win;
let daemon;

app.on('ready', ()=>{
    win = new BrowserWindow({
        width: 800,
        height: 800,
        //resizable: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('index.html');

    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null
    })

    daemon = new pinger.Pinger(sock);
    daemon.start();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        daemon.stop();
        app.quit()
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
});

ipcMain.on('/spatcon/rotationmatrix', (event, data) => {

  let msg = new osc.OSCMessage();
  msg.address = "/spatcon/rotationmatrix";
  for(let i = 0; i < 16; ++i)
  {
      msg.addArgument("f", data[i]);
  }

  sock.send(msg, 7001, "127.0.0.1");
});

