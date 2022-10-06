const { app, BrowserWindow } = require("electron");

function createMainWindow() {
  //Instantiating the browser window - whenever the app launches that time under the hood electron client initiate chromium browser.
  const mainWindow = new BrowserWindow({
    title: "Image Resizer",
    width: 500,
    height: 600,
  });

  mainWindow.loadFile();
}
