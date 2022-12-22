const listCommands = [
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

const MESSAGE = {
  invalid: 'Invalid input',
  error: 'Operation failed',
};

export { listCommands, MESSAGE };
