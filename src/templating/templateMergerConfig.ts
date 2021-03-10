import {
  packageJsonMerger,
  jsonMerger,
  unionMerger,
  yamlMerger
} from '../mergers';
import { MergeConfig } from '../types/MergeConfig';

export const templateMergerConfig: MergeConfig[] = [
  { filenamePattern: /\.(.*)ignore/, mergeFn: unionMerger },
  { filenamePattern: /\.md/, mergeFn: unionMerger },
  { filenamePattern: /package\.json/, mergeFn: packageJsonMerger },
  { filenamePattern: /\.json/, mergeFn: jsonMerger },
  { filenamePattern: /\.(yaml|yml)/, mergeFn: yamlMerger }
];
