var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');

var server = http.createServer(function (req, res) {
    var url_obj = url.parse(req.url);
    oif('/', 'index.html'); //首页链接
    oif('/signup.html', 'signup.html'); //注册页面
    oif('/signin.html', 'signin.html'); //登录页面
    oif('/logined', 'logined.html'); //跳转到登录成功页面
    oif('/getnews', 'getnews.html'); //跳转到获取新闻
    oif('/ajax.js', 'ajax.js'); //跳转到获取新闻

    function oif(opath, opage) {
        if (url_obj.pathname === opath) {
            fs.readFile(opage, 'utf-8', function (err, data) {
                if (!err) {
                    res.write(data)
                    res.end();
                }
            })
        }
    }
    //判断注册的用户名是否可用
    if (url_obj.pathname === '/getdata' && req.method === 'GET') {
        var querydata = querystring.parse(url_obj.query);
        if (querydata.username != 'admin' && querydata.username != '') {
            res.write('{"message":"可以使用"}');
            res.end();
        } else {
            res.write('{"message":"用户名不可用"}');
            res.end();
        }
    }
    if (url_obj.pathname === '/login' && req.method === 'POST') {
        var post_data = '';
        req.on('data', function (chunk) {
            post_data += chunk;
        });
        req.on('end', function () {
            var obj_post = querystring.parse(post_data);
            if (obj_post.username === 'admin' && obj_post.password === '123') {
                res.write('{"state":"1"}');
                res.end();
            } else {
                res.write('{"state":"2"}')
                res.end();
            }
        })
    }
    if (url_obj.pathname === '/newslist') {
        var arr = '[' + '{"title":"中国迎来2017年春季节"},' + '{"title":"中国迎来2018年春季节"},' + '{"title":"中国迎来2019年春季节"}' + ']';
        res.write(arr)
        res.end();
    }
})
server.listen(3000);