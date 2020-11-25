const fs = require('fs');
const path = require('path');
const readline = require('readline');

module.exports = async (job, done) => {
  try {
    const {
      data: { index }
    } = job;
    const fileTasksPath = path.join(
      __dirname,
      '../delivery/chunks',
      `dron_${index}.txt`
    );

    const delivery = [];

    if (!fs.existsSync(fileTasksPath)) return done(null, 'Nothing to do');
    const fileStream = fs.createReadStream(fileTasksPath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    for await (const line of rl) {
      console.log(`${fileTasksPath} = Line from file: ${line}, dron #${index}`);
      delivery.push(line);
    }
    job.progress(100);
    done(null, { ...job.data, fileTasksPath });
  } catch (error) {
    done(error);
  }
};
