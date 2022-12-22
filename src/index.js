import process from 'node:process';
import { homedir } from 'node:os';

import { getUserName } from './helpers.js';
import { App } from './App.js';

const app = new App(homedir(), getUserName(process.argv));

app.start();
