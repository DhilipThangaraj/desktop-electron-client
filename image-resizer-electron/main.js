const path = require("path");
const { app, BrowserWindow, Menu } = require("electron");

const isDev = process.env.NODE_DEV !== "production";
const isWindow = process.platform !== "win32";

//create the main window
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

//Menu Template
const menu = [
  {
    label: "File",
    submenu: [
      {
        label: "Quit",
        click: () => app.quit(),
        accelerator: "ctrl+w",
      },
    ],
  },
];

//When App is ready
app.whenReady().then(() => {
  createMainWindow();

  //Implement Menu
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

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
