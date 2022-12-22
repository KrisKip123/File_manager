import { stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';

import { findCommand } from './helpers.js';

const parseInput = (data) => {
  const res = data.split(' ').filter((data) => data !== '');

  const command = findCommand(res[0]);

  if (!command) return null;
  if (!command.arg) return { ...command };
  if (res.length - 1 === command.arg) return { ...command, arg: res.slice(1) };
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
