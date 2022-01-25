// Modules to control application life and create native browser window
const {app,ipcMain, BrowserWindow, globalShortcut, screen} = require('electron')
const fs=require("fs")
const path = require('path')
let mainWindow=BrowserWindow.getAllWindows()[0]
let width=1280;
let height=720;
let stage=require("./db/stages.json")
let data=require("./db/data.json");



function createWindow () {
  // Create the browser window.

  const mainWindow = new BrowserWindow({

    width: width,
    height: height,
    frame:false,
    icon:path.join(__dirname,"works","logoconContorno.png"),
    webPreferences: {
      nodeIntegration:true,
      nodeIntegrationInSubFrames:true,
      preload: path.join(__dirname, stage[data.stage].preload)
    }
  })
  mainWindow.setResizable(false);
  // and load the index.html of the app.
  mainWindow.loadFile(stage[data.stage].index)

  // Open the DevTools.
   mainWindow.webContents.openDevTools()
  return mainWindow;
}


function allFullscreen(){
  for(let e of BrowserWindow.getAllWindows()){
    e.setResizable(true);
    e.setFullScreen(!e.fullScreen);
    e.setResizable(false);
  }
}
function cambiores(width,height){
  mainWindow.setMinimumSize(width,height)
  mainWindow.setMaximumSize(width,height)
  mainWindow.setSize(width,height);
  mainWindow.center()
  BrowserWindow.getAllWindows().every((a)=>{
    console.log("uq us")
    a.setMinimumSize(width,height)
    a.setMaximumSize(width,height)
    a.setSize(width,height);
    a.center()

  })

}

app.whenReady().then(() => {
  mainWindow= createWindow()
  globalShortcut.register("f2",()=>{
    mainWindow.webContents.openDevTools();
  })
  globalShortcut.register("f1",()=>{
  allFullscreen()

  })



  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.on("exit",()=>{

  BrowserWindow.getAllWindows().every((e)=>e.close())


})
ipcMain.on("ajustes",(event, args)=>{

  if(args==="entrar") {
    const ventanaajustes = new BrowserWindow({
      width: width,
      x:mainWindow.getPosition()[0],
      y:mainWindow.getPosition()[1],
      transparent:true,
      height: height,
      frame: false,
      icon: path.join(__dirname, "works", "logoconContorno.png"),
      parent:mainWindow,
      fullscreen:mainWindow.fullScreen,
      modal:true,
      webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInSubFrames: true,
        preload: path.join(__dirname, 'Ajustes/preload.js')
      }
    })
    ventanaajustes.setResizable(false);
    // and load the index.html of the app.
    ventanaajustes.loadFile('Ajustes/Ajustes.html')
    //BrowserWindow.getAllWindows()[1].hide()


  }
  else if(args==="salir"){
    BrowserWindow.getAllWindows()[0].destroy()



  }
  else switch (args[0]){
      case "pCompleta":
        for(const pant of BrowserWindow.getAllWindows()){
          pant.setFullScreen(true);
        }
    }


})


ipcMain.on("resolucion",(event,args)=>{
  if(args==="pregunta"){

    event.reply("resolucion",[width,height,mainWindow.fullScreen]);

  }
  else {


    if(args[0]===width&&args[1]===height&&Boolean(args[2])===mainWindow.fullScreen)
      return;

    width=args[0];
    height=args[1];
    if(Boolean(args[2])!==mainWindow.fullScreen)
      allFullscreen();
    else
      cambiores(width,height);

  }

});


ipcMain.on("volumen",(event, arg)=>{
    data.volumen=arg;
    fs.writeFileSync("./db/data.json",JSON.stringify(data));
BrowserWindow.getAllWindows().map((ref) => ref.webContents.send('volumen', arg))
})
ipcMain.on("stage",(event, arg)=>{
  mainWindow.loadFile(stage[arg].index);
})