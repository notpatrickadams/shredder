const { ipcMain, ipcRenderer } = require("electron");

document.addEventListener("drop", function(e) {
    var fileList = [];
    e.preventDefault();
    e.stopPropagation();
    for (let f of e.dataTransfer.files) {
        fileList.push(f.path)
    }
    ipcRenderer.send("shredFiles", fileList);
});
document.addEventListener("dragover", function(e) {
    e.preventDefault();
    e.stopPropagation();
});