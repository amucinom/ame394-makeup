var http = require('http');
var querystring = require('querystring');
var url = require('url');

var callback = function(req, res) {

	var query = url.parse(req.url).query;
	var route = req.url.split("?")[0];
	var params = querystring.parse(query);

	console.log(req.url);
	console.log(route);
	console.log(params);

	if (route === "/getFibonacci") {

		var num = parseFloat(params.n);

		var fib = function(n) {
			if (n <= 1) {
				return n;
			} else {
				return fib(n - 1) + fib(n - 2);
			}
		};
		// var r = parseFloat(params.a) + parseFloat(params.b);
		res.writeHead(200, {
			'Content-Type': 'text/plain'
		});

		for (var i = 0; i < num; i++) {
			var result = fib(i);
			var resultToHTML = fib(i) + '\n';
			console.log(result.toString());
			// document.getElementsByTagName('body').innerHTML = result;
			res.write(resultToHTML.toString());
		}
		res.end();
		// res.end(r.toString());
	} else {
		res.writeHead(200, {
			'Content-Type': 'text/plain'
		});
		res.end("unidentified route");
	}
};

var server = http.createServer(callback);
server.listen(3942, "127.0.0.1");

console.log('Server running at http://localhost:3942/');
