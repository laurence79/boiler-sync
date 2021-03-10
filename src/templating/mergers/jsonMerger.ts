import { Json } from '@laurence79/ts-json';
import prettier from 'prettier';
import { MergeFunction } from '../../types/MergeFunction';
import { objectMerger } from './objectMerger';
import { PRETTIER_STYLE } from '../../constants/prettierStyle';

export const jsonMerger: MergeFunction = fileContents => {
  const jsonContents = fileContents.map(f => JSON.parse(f) as Json);

  const mergedContents = objectMerger(jsonContents);

  const str = JSON.stringify(mergedContents);

  return prettier.format(str, { ...PRETTIER_STYLE, parser: 'json' });
};
