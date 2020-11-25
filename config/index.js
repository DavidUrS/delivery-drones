exports.config = {
  port: process.env.PORT,
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    db: process.env.REDIS_DB,
    password: process.env.REDIS_PASSWORD
  },
  dronesNumber: process.env.NUMBER_OF_DRONES
};
