var http = require("http");

http.createServer(function(req,res){
    res.end("<h1>Welcome to my server!</h1><br><h4>www.studiohackingx.com</h4>")
}).listen(8181);
console.log("Server UP!")