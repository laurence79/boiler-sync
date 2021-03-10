import { Json, JsonMap } from '@laurence79/ts-json';
import prettier from 'prettier';
import sortPackageJson from 'sort-package-json';
import { MergeFunction } from '../types/MergeFunction';
import { objectMerger } from './objectMerger';
import { PRETTIER_STYLE } from '../constants';
import { jsonMerger } from './jsonMerger';

function isJsonMap(json: Json): json is JsonMap {
  return typeof json === 'object' && !Array.isArray(json) && json !== null;
}

export const packageJsonMerger: MergeFunction = fileContents => {
  const jsonContents = fileContents.map(f => JSON.parse(f) as Json);

  const mergedContents = objectMerger(jsonContents);

  if (!isJsonMap(mergedContents)) {
    return jsonMerger(fileContents);
  }

  const ordered = sortPackageJson(mergedContents);

  const str = JSON.stringify(ordered);

  return prettier.format(str, { ...PRETTIER_STYLE, parser: 'json' });
};
