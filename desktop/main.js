// Poorna's Kitchen desktop app (Mac .app / Windows .exe).
// Opens your hosted app link from app-settings.json (always the latest version, and Firebase login works best
// on a web address). If that link can't be reached (offline, not set up yet), it opens the copy bundled in ./www.
const { app, BrowserWindow, shell, net } = require("electron");
const path = require("path");
let settings = {};
try { settings = require("./app-settings.json"); } catch (e) {}

async function reachable(url) {
  try { const r = await net.fetch(url, { method: "GET" }); return r.ok; } catch (e) { return false; }
}

async function createWindow() {
  const win = new BrowserWindow({
    width: 1320, height: 880, minWidth: 380, minHeight: 600,
    title: "Poorna's Kitchen", backgroundColor: "#FBF3E1", autoHideMenuBar: true,
    icon: path.join(__dirname, "build", "icon.png"),
    webPreferences: { contextIsolation: true, sandbox: true }
  });
  const local = () => win.loadFile(path.join(__dirname, "www", "index.html"));
  if (settings.appUrl && await reachable(settings.appUrl)) win.loadURL(settings.appUrl).catch(local);
  else local();
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: "deny" }; });
}
app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });
