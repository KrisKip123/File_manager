import { stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';

const parseInput = (data) => {
  return data.split(' ').filter((data) => data !== '');
};

const createHashFile = async (pathToFile) => {
  await stat(pathToFile);
  const crypto = createHash('sha256');

  const readStream = createReadStream(pathToFile);

  const promises = new Promise((resolve, reject) => {
    readStream.on('data', (chunk) => {
      crypto.update(chunk);
    });
    readStream.on('end', () => resolve());
    readStream.on('error', () => reject());
  });

  await promises;

  return crypto.digest('hex');
};

export { parseInput, createHashFile };
