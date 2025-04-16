const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// This will store the reference to the window.
let mainWindow;

function createWindow() {
    // Create the window
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true, // Allow access to Node.js modules
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js'), // Optional, for security and IPC communication
        },
    });

    // Load your React app's build folder (output from React's build)
    mainWindow.loadURL('http://localhost:5000'); // If you're running the React dev server
    // OR if you have built the app, use:
    // mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));

    // Open DevTools (optional)
    mainWindow.webContents.openDevTools();

    // When the window is closed, clean up
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// When Electron is ready, create the window
app.whenReady().then(() => {
    createWindow();

    // For macOS, re-create the window when the app is reactivated
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Quit the app when all windows are closed (Windows/Linux)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
