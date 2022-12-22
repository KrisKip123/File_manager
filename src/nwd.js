import { opendir, readdir } from 'node:fs/promises';

const checkPath = async (pathDir) => {
  const dir = await opendir(pathDir);
  return dir;
};

const getInfoFiles = async (pathDir) => {
  const files = await readdir(pathDir, { withFileTypes: true });
  const filterFiles = files.filter((file) => !file.isSymbolicLink());

  const arrayFiles = [];
  const arrayFolder = [];

  for await (const file of filterFiles) {
    file.isFile()
      ? arrayFiles.push({
          name: file.name,
          type: 'file',
        })
      : arrayFolder.push({
          name: file.name,
          type: 'folder',
        });
  }

  arrayFiles.sort((a, b) => a.name.localeCompare(b.name));
  arrayFolder.sort((a, b) => a.name.localeCompare(b.name));
  console.table([...arrayFolder, ...arrayFiles]);
};

export { checkPath, getInfoFiles };
