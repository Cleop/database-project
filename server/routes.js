module.exports = [
  {
    method: 'GET',
    path: '/login',
    handler: (req, reply) => {
      reply.view('login');
    }
  },
  {
    method: 'POST',
    path: '/login',
    handler: (req, reply) => {

    }
  },
  {
    method: 'GET',
    path: '/',
    handler: (req, reply) => {
      reply('Hi Ewelina!!');
    }
  }
];