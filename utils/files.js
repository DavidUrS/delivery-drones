const fs = require('fs');
const path = require('path');
const csvSplitStream = require('csv-split-stream');

const splitFile = (filePath, lineLimit) => {
  return new Promise(resolve => {
    csvSplitStream
      .split(fs.createReadStream(filePath), { lineLimit }, index => {
        index++;
        const chunkPath = path.resolve(`delivery/chunks/dron_${index}.txt`);
        return fs.createWriteStream(chunkPath);
      })
      .then(({ totalChunks }) => {
        resolve(totalChunks);
      });
  });
};

const getCountFileLines = async filePath => {
  let i;
  let count = 0;
  return await new Promise(resolve => {
    fs.createReadStream(filePath)
      .on('data', function (chunk) {
        for (i = 0; i < chunk.length; ++i) if (chunk[i] == 10) count++;
      })
      .on('end', function () {
        resolve(count);
      });
  });
};

module.exports = { splitFile, getCountFileLines };
