const {app,BrowserWindow,Menu}=require('electron');
const path=require('path');
function create(){
  const w=new BrowserWindow({width:1280,height:800,minWidth:900,minHeight:600,title:'Quebra-Cabeça',autoHideMenuBar:true,backgroundColor:'#FBF8FF'});
  Menu.setApplicationMenu(null);
  w.loadFile(path.join(__dirname,'index.html'));
  w.webContents.on('before-input-event',(e,i)=>{if(i.type==='keyDown'&&i.key==='F11'){w.setFullScreen(!w.isFullScreen());e.preventDefault()}});
}
app.whenReady().then(create);
app.on('window-all-closed',()=>app.quit());
