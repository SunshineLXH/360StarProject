安装好 [Node.js](https://nodejs.org) 之后，直接这样运行每个文件就可以了。

```shell
node tcpserver.js
```

代码中用到的三个 Node.js 模块及对应文档如下：

* [net](https://nodejs.org/api/net.html)：
* [dns](https://nodejs.org/api/dns.html)；
* [url](https://nodejs.org/api/url.html)；

实际上，Node.js 也直接提供创建 HTTP Server 的模块：

* [http](https://nodejs.org/api/http.html)；

NPM 上也有非常多的 HTTP Client 库，例如：

* [request](https://github.com/request/request)；