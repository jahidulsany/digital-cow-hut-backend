/* eslint-disable no-console */
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';

process.on('uncaughtException', () => {
  console.log('Uncaught exception is detected...');
  process.exit(1);
});

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(`🛢️ Database is connected successfully!`);
    server = app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}`);
    });
  } catch (err) {
    console.log('Failed to connect!', err);
  }

  process.on('unhandledRejection', () => {
    console.log('UnhandledRejection occured! We are now closing the server!!!');
    if (server) {
      server.close(() => {
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

process.on('SIGTERM', () => {
  console.log('SIGTERM is received');
  if (server) {
    server.close();
  }
});
