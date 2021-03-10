import { MergeFunction } from '../../types/MergeFunction';

export const unionMerger: MergeFunction = fileContents =>
  fileContents.join('\n');
