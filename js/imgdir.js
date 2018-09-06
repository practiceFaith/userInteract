// ctrl+shift+F10运行js文件
var fs=require('fs');   /*需要配置node.js*/
fs.readdir('../img',function(error,fileAry){
    console.log(JSON.stringify(fileAry));
});