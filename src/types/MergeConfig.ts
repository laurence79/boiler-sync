import { MergeFunction } from './MergeFunction';

export type MergeConfig = {
  filenamePattern: RegExp;
  mergeFn: MergeFunction;
};
