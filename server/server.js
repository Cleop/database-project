const path = require('path');
const hapi = require('hapi');
const vision = require('vision');
const inert = require('inert');
const routes = require('./routes');

const server = new hapi.Server();

server.connection({
  port: process.env.PORT || 8000,
  routes: {
    files: {
      relativeTo: path.join(__dirname, '..', 'public')
    }
  }
});

server.register([inert, vision], err => {
  if(err) console.log(err);
  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: path.join('..', 'public', 'views')
  });

  server.route(routes);
});

module.exports = server;
