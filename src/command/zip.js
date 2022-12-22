import { createBrotliCompress, createBrotliDecompress, createGunzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { stat } from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { parse, resolve } from 'node:path';

const compressOrDecompressFile = async (pathToFile, pathToDestination, type) => {
  await stat(pathToFile);

  const { name, ext } = parse(pathToFile);
  const brotli = type === 'compress' ? createBrotliCompress() : createBrotliDecompress();
  const typeFile = type === 'compress' ? '.gz' : '.txt';

  const readStream = createReadStream(pathToFile);
  const writeStream = createWriteStream(resolve(pathToDestination, `./${name}${typeFile}`), {
    flags: 'wx',
  });
  await pipeline(readStream, brotli, writeStream);
};

export { compressOrDecompressFile };
