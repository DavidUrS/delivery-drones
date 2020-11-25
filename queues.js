const Queue = require('bull');
const { dron: dronWorker } = require('./workers');
const {
  config: { redis }
} = require('./config');

const dron = new Queue('dron', { redis });

dron.process((job, done) => dronWorker(job, done));

const queues = [
  {
    name: 'dron',
    hostId: 'Dron Manager',
    redis
  }
];

module.exports = { dron, queues };
