import process from 'node:process';
import { homedir } from 'node:os';

import { parseInput } from './utils.js';
import { getUserName, goodBye, goodByeHandler } from './helpers.js';
import { App } from './App.js';
import { MESSAGE } from './constants.js';

console.log(`Welcome to the File Manager, ${getUserName(process.argv)}!`);
console.log(`You are currently in ${homedir()}`);

const app = new App();

process.stdin.on('data', goodByeHandler);

process.stdin.on('data', async (chunk) => {
  const data = chunk.toString().trim();
  const command = parseInput(data);
  if (!command) {
    console.log(MESSAGE.invalid);
    return;
  }
  const { arg, name } = command;
  try {
    await app[name](arg);
  } catch (error) {
    console.log(MESSAGE.error);
  }
});

process.on('SIGINT', () => goodBye());
