import { MergeConfig } from '../../types/MergeConfig';
import { packageJsonMerger } from './packageJsonMerger';
import { jsonMerger } from './jsonMerger';
import { unionMerger } from './unionMerger';
import { yamlMerger } from './yamlMerger';

export const mergerConfig: MergeConfig[] = [
  { filenamePattern: /\.(.*)ignore/, mergeFn: unionMerger },
  { filenamePattern: /\.md/, mergeFn: unionMerger },
  { filenamePattern: /package\.json/, mergeFn: packageJsonMerger },
  { filenamePattern: /\.json/, mergeFn: jsonMerger },
  { filenamePattern: /\.(yaml|yml)/, mergeFn: yamlMerger }
];
