/**
 * 
 * @param {请求的方法} method 
 * @param {请求的地址} url 
 * @param {发送的数据} data 
 * @param {数据请求成功后,需要处理的业务} success 
 */
function ajax(options) {
    console.log('111')
    try {
        xhr = new XMLHttpRequest;
    } catch {
        xhr = activeXobject;
    }
    if (options.method === 'GET') {
        xhr.open('GET', options.url + '?' + options.data, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var arr = JSON.parse(xhr.responseText);
                options.success && options.success(arr);
            }
        }
    } else if (options.method === 'POST') {
        xhr.open('POST', options.url, true);
        xhr.send(options.data);
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            
            if (xhr.readyState === 4 && xhr.status === 200) {
                
                var arr = JSON.parse(xhr.responseText);
            }
        }
    }

}