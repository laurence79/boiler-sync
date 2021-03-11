import { githubWorkflowMerger, packageJsonMerger } from '../mergers';
import { MergeConfig } from '../types/MergeConfig';

export const applicationMergerConfig: MergeConfig[] = [
  { filenamePattern: /package\.json/, mergeFn: packageJsonMerger },
  {
    filenamePattern: /\.github\/workflows\/(.*).yml/,
    mergeFn: githubWorkflowMerger
  }
];
