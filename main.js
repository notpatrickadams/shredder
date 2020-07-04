const { app, BrowserWindow, ipcMain, ipcRenderer } = require("electron");
const $ = require("jquery");
const fs = require("fs");

function createMain() {
    let win = new BrowserWindow({
        width: 1050,
        height: 700,
        webPreferences: {
            nodeIntegration: true
        },
        minWidth: 600,
        minHeight: 400,
        titleBarStyle: "hiddenInset"
    });
    win.loadFile("index.html");
}

app.on('window-all-closed', () => { 
    //Quits the app completely on OSX when all windows are closed.
    if (process.platform == 'darwin') {
        app.quit() 
    } 
});

ipcMain.on("shredFiles", (event, filePaths) => {
    for (let f of filePaths) {
        fs.unlink(f, (err) => {
            if (err) {
                throw err;
            }
        });
    }
})

app.whenReady().then(createMain);