const path = require("path");
const { app, BrowserWindow } = require("electron");

const isDev = process.env.NODE_DEV !== "production";
const isWindow = process.platform !== "win32";

function createMainWindow() {
  //Instantiating the browser window - whenever the app launches that time under the hood electron client initiate chromium browser.
  const mainWindow = new BrowserWindow({
    title: "Image Resizer",
    width: isDev ? 1000 : 500,
    height: 800,
  });

  //Open devtools if in dev env
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
  mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"));
}

//initial mounting
app.whenReady().then(() => {
  createMainWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

//when all windows are closed electron client will get quit.
app.on("window-all-closed", () => {
  if (isWindow) {
    app.quit();
  }
});
