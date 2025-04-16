const { app, BrowserWindow } = require('electron');
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
        },
    });

    // Load your React app's build folder (output from React's build)
    mainWindow.loadFile(path.join(__dirname, 'frontend', 'build', 'index.html'));

    // If you want to load from production build, uncomment this line and comment the above:
    // mainWindow.loadFile(path.join(__dirname, 'frontend', 'build', 'index.html'));

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
