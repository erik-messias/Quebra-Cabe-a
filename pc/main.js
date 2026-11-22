const {app,BrowserWindow,Menu,session,shell}=require('electron');
const path=require('path');
function create(){
  const w=new BrowserWindow({width:1280,height:800,minWidth:900,minHeight:600,title:'Quebra-Cabeça',autoHideMenuBar:true,backgroundColor:'#FBF8FF'});
  Menu.setApplicationMenu(null);
  // loja de mangás: libera as respostas do MangaDex para o app e identifica o programa
  const MD=['https://*.mangadex.org/*','https://*.mangadex.network/*'];
  session.defaultSession.webRequest.onBeforeSendHeaders({urls:MD},(d,cb)=>{d.requestHeaders['User-Agent']='QuebraCabeca/1.0';cb({requestHeaders:d.requestHeaders})});
  session.defaultSession.webRequest.onHeadersReceived({urls:MD},(d,cb)=>{const h=d.responseHeaders||{};for(const k of Object.keys(h))if(k.toLowerCase().startsWith('access-control-'))delete h[k];h['Access-Control-Allow-Origin']=['*'];cb({responseHeaders:h})});
  w.webContents.setWindowOpenHandler(({url})=>{if(/^https:\/\//.test(url))shell.openExternal(url);return {action:'deny'}});
  w.loadFile(path.join(__dirname,'index.html'));
  w.webContents.on('before-input-event',(e,i)=>{if(i.type==='keyDown'&&i.key==='F11'){w.setFullScreen(!w.isFullScreen());e.preventDefault()}});
}
app.whenReady().then(create);
app.on('window-all-closed',()=>app.quit());
