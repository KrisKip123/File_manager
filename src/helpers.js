const getUserName = (arrayData) => {
  const data = arrayData
    .slice(2)
    .map((str) => str.replace(/-*/i, ''))
    .filter((item) => item.includes('username'));

  return data[0].split('=')[1];
};

const goodBye = () => {
  console.log(`Thank you for using File Manager, ${getUserName(process.argv)}, goodbye!`);
  process.exit();
};

const goodByeHandler = (chunk) => {
  const data = chunk.toString().trim();
  if (data === '.exit') {
    goodBye();
  }
};

export { getUserName, goodBye, goodByeHandler };
