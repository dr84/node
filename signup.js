var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');


var app = http.createServer(function (req, res) {
    res.setHeader('content-type', 'text/html;charset=utf-8');
    var url_obj = url.parse(req.url);

    if (url_obj.pathname === '/sign') {
        fs.readFile('sign.html', 'utf-8', function (err, data) {
            if (!err) {
                res.write(data);
                res.end();
            }
        });
    }

    if (url_obj.pathname === '/sign-ck') {
        var ck = querystring.parse(url_obj.query);

        if (ck.username === 'admin') {
            res.write('{"status":1,"msg":"已存在" }');
            res.end();
        } else if(ck.username !== 'admin') {
            res.write('{"status":0,"msg":"可以注册" }');
            res.end();
        }
    }

});
app.listen("3000")