import os from 'node:os';
import { MESSAGE } from '../constants.js';

const getInfo = () => {
  const { username } = os.userInfo({ encoding: 'utf-8' });

  const infoCPU = os.cpus();

  const res = infoCPU.map((cpu) => {
    return {
      model: cpu.model,
      rateClock: `${cpu.speed / 1000} GHz`,
    };
  });

  return {
    EOL: os.EOL,
    CPU: res,
    homedir: os.homedir(),
    username: username,
    architecture: os.arch(),
  };
};

const getInfoSystems = (params) => {
  const { EOL, CPU, homedir, username, architecture } = getInfo();
  switch (params) {
    case '--EOL':
      console.log(EOL);
      break;
    case '--cpus':
      console.log(`Overall amount of CPUS ${CPU.length}`);
      console.table(CPU);
      break;
    case '--homedir':
      console.log(homedir);
      break;
    case '--username':
      console.log(username);
      break;
    case '--architecture':
      console.log(architecture);
      break;
    default:
      console.log(MESSAGE.invalid);
      break;
  }
};

export { getInfoSystems };
