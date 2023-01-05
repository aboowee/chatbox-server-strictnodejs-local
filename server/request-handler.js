/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.


*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.


**************************************************************/

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization',
  'access-control-max-age': 10 // Seconds.
};

let body = []; // This is where the data is stored

var requestHandler = function(request, response) {

  const { method, url } = request;

  var headers = defaultCorsHeaders;

  let data = ''; //{text, username, roomname}

  request.on('error', (err) => { // If there is an error in request, will console log error
    console.error(err);
  });
  request.on('data', (chunk) => { //Otherwise, once data is received, push into storage
    data = chunk.toString();
  });
  request.on('end', () => { //Response goes in here, at the end of receiving data request

    response.on('error', (err) => { //Error on response, console log error
      console.error(err);
    });


    console.log('Serving request type ' + request.method + ' for url ' + request.url);

    var statusCode = 200;

    headers['Content-Type'] = 'application/json';

    if (method === 'GET' && url.includes('/classes/messages')) {
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(body));
    }
    if (method === 'POST' && url.includes('/classes/messages')) {
      body.push(data);
      response.writeHead(statusCode, headers);
      response.end();
    }


    //response.end(whatever you want in here);
    //response.end(JSON.stringify(body));
  });

};



module.exports = { requestHandler };