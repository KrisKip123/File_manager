const getUserName = (arrayData) => {
  const data = arrayData
    .slice(2)
    .map((str) => str.replace(/-*/i, ''))
    .filter((item) => item.includes('username'));

  return data[0].split('=')[1];
};

const goodBye = (userName) => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
  process.exit();
};

const goodByeHandler = (chunk, userName) => {
  const data = chunk.toString().trim();
  if (data === '.exit') {
    goodBye(userName);
  }
};

export { getUserName, goodBye, goodByeHandler };
