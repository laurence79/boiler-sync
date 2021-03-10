import path from 'path';
import { BLOCK_LIST } from '../constants/files';
import { allFilesAndFoldersIn } from './allFilesAndFoldersIn';

export const getCombinedFileList = (inFolders: string[]): string[] => {
  return inFolders
    .flatMap(dir => {
      return allFilesAndFoldersIn(dir).map(f => {
        const filename = f.endsWith('.hbs') ? f.substring(0, f.length - 4) : f;
        return path.relative(dir, filename);
      });
    })
    .distinct()
    .filter(f => !BLOCK_LIST.includes(f))
    .sort();
};
