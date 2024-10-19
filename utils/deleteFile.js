import fs from 'fs';
import path from 'path';

export const deleteFile = (filePath) => {
  const absolutePath = path.resolve(filePath);

  fs.unlink(absolutePath, (err) => {
    if (err) {
      console.error(`Error deleting file: ${absolutePath}`, err);
    } else {
      console.log(`Successfully deleted file: ${absolutePath}`);
    }
  });
};
