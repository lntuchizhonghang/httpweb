var http=require('http');
var fs=require('fs');
var server=http.createServer(function(req,res){
  if(req.method=='GET'&&'/image.jpg'==req.url){
    fs.stat(__dirname+req.url,function(err,stats){
      if(err||!stats.isFile()){
        res.end('Not Found!');
        return;
      }
      serve(__dirname+req.url,'application/jpg');
    });
  }else if(req.url=='/'&&req.method=='GET'){
    serve(__dirname+'/index.html','text/html');
  }else{
    res.writeHead(404);
    res.end('Not Found!');
  }
  function serve(path,type){
    res.writeHead(200,{'Content-Type':type});
    fs.createReadStream(path).pipe(res);
  }
});
server.listen(8081,function(){
  console.log('Server is listening on 8081 port!');
});
