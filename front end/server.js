// const express = require('express')
// var livereload = require('livereload');

// const app = express()
// var server = livereload.createServer();
// server.watch(__dirname +'/scripts');

// app.use(express.static(__dirname +'/scripts'))
// app.get('/', (req, res) => {
// 	res.sendFile(__dirname)
// })

// app.listen(3000, function() {
//   console.log('listening on 3000')
// })

var StaticServer = require('static-server');

var server = new StaticServer({
	rootPath: './',
	port : 9000
})

server.start(function () {
	console.log('server started on port' + server.port)
})