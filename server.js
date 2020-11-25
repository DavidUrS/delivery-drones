const Arena = require('bull-arena');

module.exports = (app, port, queues) => {
  const arenaConfig = Arena(
    {
      queues
    },
    {
      basePath: '/',
      disableListen: true
    }
  );

  app.use('/', arenaConfig);
  app.listen(port, () => {
    console.log('Server on port', port);
  });
};
