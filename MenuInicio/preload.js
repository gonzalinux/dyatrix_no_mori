// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge,ipcRenderer}=require("electron")

contextBridge.exposeInMainWorld("api",{
    require:(cosa)=>{
        return require(cosa);
    },
    send: (channel, data) => {
        // whitelist channels
        let validChannels = ["ajustes","exit","stage","volumen"];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    receive: (channel, func) => {
        let validChannels = ["volumen"];
        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel, (event, args) => func(args));
        }else{
            console.error("not a valid channel: "+channel)
        }
    }

})





