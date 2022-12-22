import { homedir } from 'node:os';
import { resolve } from 'node:path';

import { checkPath, getInfoFiles } from './nwd.js';
import { readFromFile, createNewFile, renameFile, copyFile, removeFile } from './command/files.js';
import { getInfoSystems } from './command/os.js';
import { createHashFile, parseInput } from './utils.js';
import { compressOrDecompressFile } from './command/zip.js';
import { goodByeHandler, goodBye } from './helpers.js';
import { MESSAGE } from './constants.js';

class App {
  constructor(workPath = homedir(), userName = 'Anonymous') {
    this._workPath = workPath;
    this._userName = userName;

    console.log(`Welcome to the File Manager, ${userName}!`);
    console.log(`You are currently in ${workPath}`);
  }

  _listCommands = [
    {
      name: 'up',
      arg: null,
    },
    {
      name: 'cd',
      arg: 1,
    },
    {
      name: 'ls',
      arg: null,
    },
    {
      name: 'cat',
      arg: 1,
    },
    {
      name: 'add',
      arg: 1,
    },
    {
      name: 'rn',
      arg: 2,
    },
    {
      name: 'cp',
      arg: 2,
    },
    {
      name: 'mv',
      arg: 2,
    },
    {
      name: 'rm',
      arg: 1,
    },
    {
      name: 'os',
      arg: 1,
    },
    {
      name: 'hash',
      arg: 1,
    },
    {
      name: 'compress',
      arg: 2,
    },
    {
      name: 'decompress',
      arg: 2,
    },
  ];

  up() {
    this._workPath = resolve(this._workPath, '..');
  }

  async cd([newPath]) {
    const dir = await checkPath(resolve(this._workPath, newPath));
    this._workPath = dir.path;
    dir.close();
  }

  async ls() {
    await getInfoFiles(this._workPath);
  }

  async cat([pathToFile]) {
    await readFromFile(resolve(this._workPath, pathToFile));
  }

  async add([pathToFile]) {
    await createNewFile(resolve(this._workPath, pathToFile));
  }

  async rn([pathToFile, newFilename]) {
    await renameFile(resolve(this._workPath, pathToFile), resolve(this._workPath, newFilename));
  }

  async cp([pathToFile, pathToNewDirectory]) {
    await copyFile(
      resolve(this._workPath, pathToFile),
      resolve(this._workPath, pathToNewDirectory)
    );
  }

  async mv([pathToFile, pathToNewDirectory]) {
    await this.cp([pathToFile, pathToNewDirectory]);
    await this.rm([pathToFile]);
  }

  async rm([pathToFile]) {
    await removeFile(resolve(this._workPath, pathToFile));
  }

  os([params]) {
    getInfoSystems(params);
  }

  async hash([pathToFile]) {
    const path = resolve(this._workPath, pathToFile);
    const hash = await createHashFile(path);
    console.table([{ hash, path }]);
  }

  async compress([pathToFile, pathToDestination]) {
    await compressOrDecompressFile(
      resolve(this._workPath, pathToFile),
      resolve(this._workPath, pathToDestination),
      'compress'
    );
  }

  async decompress([pathToFile, pathToDestination]) {
    await compressOrDecompressFile(
      resolve(this._workPath, pathToFile),
      resolve(this._workPath, pathToDestination),
      'decompress'
    );
  }

  getCommand(input) {
    const [nameCommand, ...params] = input;
    const command = this._listCommands.find((command) => command.name === nameCommand) ?? null;

    if (!command) return null;
    if (!command.arg) return { ...command };
    if (input.length - 1 === command.arg) return { ...command, arg: [...params] };
  }

  async start() {
    process.stdin.on('data', goodByeHandler);

    process.stdin.on('data', async (chunk) => {
      const data = chunk.toString().trim();

      const cli = parseInput(data);

      const command = this.getCommand(cli);

      if (!command) {
        console.log(MESSAGE.invalid);
        return;
      }
      const { arg, name } = command;
      try {
        await this[name](arg);
      } catch (error) {
        console.log(MESSAGE.error);
      }
    });

    process.on('SIGINT', () => goodBye());
  }
}

export { App };
