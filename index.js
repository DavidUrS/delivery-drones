require('dotenv').config();
const express = require('express');
const path = require('path');

const { queues, dron } = require('./queues');
const server = require('./server');
const {
  environmentUtils: { validateRequiredEnvs },
  fileUtils: { splitFile, getCountFileLines }
} = require('./utils');

const envVariables = [
  'PORT',
  'REDIS_DB',
  'REDIS_PORT',
  'REDIS_HOST',
  'REDIS_PASSWORD',
  'NUMBER_OF_DRONES'
];
validateRequiredEnvs(envVariables);

const {
  config: { port, dronesNumber }
} = require('./config');

const app = express();

server(app, port, queues);

(async () => {
  const filePath = path.join(__dirname, 'delivery', 'list.txt');
  const countLines = await getCountFileLines(filePath);
  let lineLimit = countLines / +dronesNumber;
  const total = await splitFile(filePath, Math.floor(+lineLimit) + 1);

  for (let i = 1; i <= +total; i++) {
    await dron.add({ name: `Dron #${i}`, index: i });
  }
})();

process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error.message);
});
