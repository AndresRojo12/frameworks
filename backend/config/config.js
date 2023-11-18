require('dotenv').config();

const config = {
  // General
  env: process.env.NODE_ENV || 'dev',
  appPort: process.env.APP_PORT || 3005,
  corsWhitelist: process.env.CORS_WHITELIST,
  //jwtSecret: process.env.JWT_SECRET,
  // Database
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,

}

module.exports = { config };
