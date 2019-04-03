var http = require('http');
var url = require('url');
var fs = require('fs');

var app = http.createServer(function (req, res) {
    var url_obj = url.parse(req.url);

    if (url_obj.pathname === '/') {
        fs.readFile('getnews.html', 'utf-8',function (err,data) {
            res.write(data);
            res.end();
        })

    }
    if (url_obj.pathname === '/getnews') {
            res.write('['+'{"title":"news1"}'+','+'{"title":"news2"}'+','+'{"title":"news3"}'+','+'{"title":"news4"}'+']');
            res.end();
        

    }








})
app.listen('3000');