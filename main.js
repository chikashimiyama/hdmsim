const { app, BrowserWindow, ipcMain} = require('electron');
const OscEmitter = require('osc-emitter');
let emitter = new OscEmitter();
emitter.add("127.0.0.1", 5000);
let win;

function createWindow () {
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

ipcMain.on('/headrotation', (event, data) => {
   emitter.emit("/headrotation",
       data[0], data[1], data[2], data[3],
       data[4], data[5], data[6], data[7],
       data[8], data[9] ,data[10], data[11],
       data[12], data[13], data[14], data[15]);
});




