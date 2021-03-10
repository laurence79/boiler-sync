import path from 'path';
import fs from 'fs';

export const allFilesAndFoldersIn = (dir: string): string[] => {
  return fs.readdirSync(dir).flatMap(f => {
    const fullPath = path.join(dir, f);
    const s = fs.statSync(fullPath);
    if (s.isDirectory()) {
      return allFilesAndFoldersIn(fullPath);
    }
    return fullPath;
  });
};
