import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import winston from 'winston';
import expressWinston from 'express-winston';

import { Routing } from './app-routes.ts';
import { createConfig } from './config.ts';
import { DB_SERVER } from './utils/constants.ts';
import { IConfig } from './utils/interfaces.ts';

async function initializeServer() {
  const Config: IConfig = await createConfig();
  const env = Config.env ?? 'development';
  const server = express();

  expressWinston.bodyBlacklist.push('password');
  const logger = winston.createLogger({
    transports: [
      new winston.transports.File({
        level: 'info',
        filename: './log/all-logs.log',
        handleExceptions: true,
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.json()
        ),
        maxsize: 2621440,
        maxFiles: 10,
        eol: ',\r\n'
      }),
      new winston.transports.Console({
        level: 'info',
        handleExceptions: true,
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.json()
        ),
        eol: '\r\n'
      })
    ],
    exitOnError: false
  }) as winston.Logger;

  const morganStream = {
    write: (message: string) => {
      logger.info(message.trim());
    }
  };
  server.use(
    morgan('combined', {
      stream: morganStream
    })
  );

  // MongoDB connection configuration
  const mongoConfig: mongoose.ConnectOptions = {
    maxPoolSize: 150,
    minPoolSize: 20, // Keep 20 warm connections
    maxIdleTimeMS: 30000, // Close idle connections after 30s
    socketTimeoutMS: 30000, // 30s socket inactivity timeout (not query timeout)
    serverSelectionTimeoutMS: 5000, // Faster failover detection
    retryWrites: true, // Auto-retry write failures
    retryReads: true // Auto-retry read failures
  };
  // If authentication is enabled, provide credentials for the database
  if (Config.db.authenticate) {
    mongoConfig.user = Config.db.username;
    mongoConfig.pass = Config.db.password;
    mongoConfig.authSource = 'admin';
  }

  // Connect to MongoDB using Mongoose
  mongoose
    .connect(
      `mongodb://${Config.dbHost}:${Config.dbPort}/${
        Config.debug && !Config.staging ? `${DB_SERVER}-` : ''
      }${Config.dbName}`,
      mongoConfig
    )
    .then(() => {
      console.log(`Database connection: ${Config.dbHost}:${Config.dbPort}`);
    })
    .catch((error) => {
      console.log('Error : Could not connect to the database.\n', error);
      process.exit(-1);
    });

  server.use(Routing);

  const PORT: number = Number(
    process.env.PORT ?? Config.server[env].port ?? 8080
  );

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`HTTP server running on port ${PORT}`);
  });

  console.log(`✅ Server initialized with secrets for environment!!!`);
}

// Start the server
initializeServer().catch((error) => {
  console.error('❌ Server startup failed:', error);
  process.exit(1);
});
