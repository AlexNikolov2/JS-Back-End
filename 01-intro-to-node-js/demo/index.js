const http = require('http');

const server = http.createServer((request, response) => {
   console.log('request received!'); 

   console.log(request);
   response.write("Hello World!");
   response.end();
});
server.listen(3000);

//I was watching most of the time lol
