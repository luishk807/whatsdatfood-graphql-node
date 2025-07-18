import http from 'http';
import app from './app';
import config from 'config/config';
import { initDB } from 'db';

import { setupGraphQL } from 'routes/graphql.route';

async function startServer() {
  await initDB();

  const httpServer = http.createServer(app);

  await setupGraphQL(app, httpServer);

  httpServer.listen(config.port, () => {
    console.log(`GraphQL running on port ${config.port}`);
  });
}
startServer();
