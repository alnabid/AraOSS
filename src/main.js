import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import { readFileSync, writeFile, readdir, promises as fsPromises } from 'node:fs';

import Store from 'electron-store';
import { ChildProcess, spawn } from 'node:child_process';
import { join } from 'node:path';
import { cwd } from 'node:process';
const settingsPath = path.join(app.getPath('userData'), 'settings.json');

const store = new Store();

if (started) {
  app.quit();
}

const createWindow = () => {
  const splash = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    show: true,
  });

  splash.loadFile(path.join(__dirname, 'loading.html'));

  const mainWindow = new BrowserWindow({
    width: 950,
    height: 550,
    minWidth: 950,
    minHeight: 550,
    show: false, // do not show until ready
    frame: false,
    titleBarStyle: 'hidden',
    icon: process.platform === 'win32'
      ? path.join(__dirname, 'assets', 'icon.ico')
      : path.join(__dirname, 'assets', 'icon.icns'),
    webPreferences: {
      preload: path.join(__dirname, '/preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Load main app
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // When ready, close splash and show main
  mainWindow.once('ready-to-show', () => {
    splash.destroy();
    mainWindow.show();
    mainWindow.maximize();
    mainWindow.webContents.setZoomFactor(0.8);
    mainWindow.webContents.setVisualZoomLevelLimits(1, 1);
  });

  // IPC handlers
  ipcMain.on('maximize-app', () => {
    if (mainWindow) {
      mainWindow.setFullScreen(false);
      mainWindow.maximize();
    } 
  });

  ipcMain.on('restore-app', () => {
    if (mainWindow) {
      mainWindow.setFullScreen(false);
      mainWindow.restore();
    } 
  });

  ipcMain.on('fullscreen-app', () => {
    if (mainWindow) mainWindow.setFullScreen(true);
  });
};


ipcMain.handle('save-settings', async (_, settings) => {
  await fsPromises.writeFile(settingsPath, JSON.stringify(settings, null, 2));
});

// Load settings to renderer
ipcMain.handle('load-settings', async () => {
  try {
    const raw = await fsPromises.readFile(settingsPath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.log('Failed to load settings:', err);
    return null;
  }
});
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('exit-app', () => {
  app.quit();
});