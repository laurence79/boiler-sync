import { MergeFunction } from '../types/MergeFunction';

export const replaceMerger: MergeFunction = fileContents =>
  fileContents.last() ?? '';
