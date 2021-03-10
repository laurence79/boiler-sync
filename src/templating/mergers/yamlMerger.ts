import { Json } from '@laurence79/ts-json';
import prettier from 'prettier';
import yaml from 'yaml';
import { MergeFunction } from '../../types/MergeFunction';
import { objectMerger } from './objectMerger';
import { PRETTIER_STYLE } from '../../constants/prettierStyle';

export const yamlMerger: MergeFunction = fileContents => {
  const yamlContents = fileContents.map(f => yaml.parse(f) as Json);

  const obj = objectMerger(yamlContents);

  const str = yaml.stringify(obj);

  return prettier.format(str, { ...PRETTIER_STYLE, parser: 'yaml' });
};
