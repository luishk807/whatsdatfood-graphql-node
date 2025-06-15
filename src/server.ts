import app from './app';
import config from './config/config';
import { initDB } from './db';

initDB().then(() => {
  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
});
