const path = require("path");
const { app, BrowserWindow } = require("electron");

function createMainWindow() {
  //Instantiating the browser window - whenever the app launches that time under the hood electron client initiate chromium browser.
  const mainWindow = new BrowserWindow({
    title: "Image Resizer",
    width: 500,
    height: 600,
  });

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
  if (process.platform !== "win32") {
    app.quit();
  }
});
