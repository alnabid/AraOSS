const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  saveSettings: (settings) => ipcRenderer.invoke('save-settings', settings),
  loadSettings: () => ipcRenderer.invoke('load-settings'),
  exitApp: () => ipcRenderer.send('exit-app'),
  maximizeApp: () => ipcRenderer.send('maximize-app'),
  restoreApp: () => ipcRenderer.send('restore-app'),
  fullscreenApp: () => ipcRenderer.send('fullscreen-app'),
});