const {app, BrowserWindow} = require('electron')
const url = require("url");
const path = require("path");
const indexPath = path.join(__dirname, `./dist/practice-electron-app/browser/index.html`)


function createWindow () {
  let mainWindow
  // if(mainWindow !== undefined){
  //   mainWindow.close()
  //   mainWindow = null
  // }

  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'dist/practice-electron-app/browser', 'favicon.ico'),
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        enableRemoteModule: false,
        devTools: false    
    }
  })


  mainWindow.loadURL(
    url.format({
      pathname: indexPath,
      protocol: "file:",
      slashes: true
    })
  );

  mainWindow.on('closed', function () {
    mainWindow = null
  })

  // This makes it so that when the app reloads, it doesn't break
  mainWindow.webContents.on('did-start-navigation', (event) => {
    if(event.isSameDocument){
      return
    }
    mainWindow.close()
    createWindow()
  });
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})


