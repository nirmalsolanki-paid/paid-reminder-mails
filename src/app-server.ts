import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import winston from 'winston';
import expressWinston from 'express-winston';
import { Routing } from './app-routes.ts';
import { Config } from './config.ts';
import { DB_SERVER } from './utils/constants.ts';

async function initializeServer() {
  const env = Config.env ?? 'development';
  const server = express();

  // Logger setup
  expressWinston.bodyBlacklist.push('password');
  const logger = winston.createLogger({
    transports: [
      new winston.transports.Console({
        level: 'info',
        handleExceptions: true,
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.json()
        )
      })
    ],
    exitOnError: false
  });

  server.use(
    morgan('combined', { stream: { write: (msg) => logger.info(msg.trim()) } })
  );

  // MongoDB connection
  const mongoConfig: mongoose.ConnectOptions = {
    maxPoolSize: 150,
    minPoolSize: 20,
    maxIdleTimeMS: 30000,
    socketTimeoutMS: 30000,
    serverSelectionTimeoutMS: 5000,
    retryWrites: true,
    retryReads: true
  };

  if (Config.db.authenticate) {
    mongoConfig.user = Config.db.username;
    mongoConfig.pass = Config.db.password;
    mongoConfig.authSource = 'admin';
  }

  await mongoose.connect(
    `mongodb://${Config.dbHost}:${Config.dbPort}/${
      Config.debug && !Config.staging ? `${DB_SERVER}-` : ''
    }${Config.dbName}`,
    mongoConfig
  );
  console.log(`Connected to DB: ${Config.dbHost}:${Config.dbPort}`);

  // Express routes
  server.use(Routing);

  // Use Cloud Run port or fallback
  const PORT = process.env.PORT || 8080;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  console.log(`✅ Server initialized for Cloud Run`);
}

initializeServer().catch((err) => {
  console.error('❌ Server startup failed:', err);
  process.exit(1);
});
