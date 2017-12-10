const {app, BrowserWindow}= require('electron');
const path = require('path');
const url = require('url');

let win;

function createWindow(){
  const isAppMode = true;
  win = new BrowserWindow({width:1400, height:900, frame: false, transparent: true, icon:__dirname+'/images/logo.png'})
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  win.on('closed', ()=> {
    win = null;
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin'){
    app.quit();
  }
})
