import { createReadStream, createWriteStream } from 'node:fs';
import { writeFile, rename, stat, rm } from 'node:fs/promises';
import { parse, resolve } from 'node:path';
import { pipeline } from 'node:stream/promises';

const readFromFile = async (pathToFile) => {
  const readStream = createReadStream(pathToFile);

  const read = new Promise((resolve, reject) => {
    readStream.on('data', (chunk) => {
      const data = chunk.toString().trim();
      process.stdout.write(data);
    });

    readStream.on('end', () => resolve());

    readStream.on('error', () => reject());
  });

  await read;
};

const createNewFile = async (pathToFile) => {
  await writeFile(pathToFile, '', { flag: 'wx' });
};

const renameFile = async (pathToFile, newNameFile) => {
  const { dir } = parse(pathToFile);
  const { base } = parse(newNameFile);
  await rename(pathToFile, resolve(dir, base));
};

const copyFile = async (pathToFile, newPathToDirectory) => {
  const { base } = parse(pathToFile);
  await stat(pathToFile);
  const readStream = createReadStream(pathToFile);
  const writeStream = createWriteStream(resolve(newPathToDirectory, base), { flags: 'wx' });
  await pipeline(readStream, writeStream);
};

const removeFile = async (pathToFile) => {
  await rm(pathToFile);
};

export { readFromFile, createNewFile, renameFile, copyFile, removeFile };
