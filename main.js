const { app, BrowserWindow, ipcMain} = require('electron');
const OscEmitter = require('osc-emitter');
let win;

function createWindow () {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        resizable: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('index.html');

    win.webContents.openDevTools();

    win.on('closed', () => {

        win = null
    })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {

    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {

    if (win === null) {
        createWindow()
    }
});

ipcMain.on('euler', (event, data) => {
   console.log(data);
});

let emitter = new OscEmitter();
emitter.add("127.0.0.1", 5000);
emitter.emit("/greet", 12);
