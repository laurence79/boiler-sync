import { Json, JsonArray, JsonMap } from '@laurence79/ts-json';
import prettier from 'prettier';
import yaml from 'yaml';
import merge from 'deepmerge';
import { MergeFunction } from '../types/MergeFunction';
import { PRETTIER_STYLE } from '../constants/prettierStyle';
import { squashDuplicatedPrimitives } from './squashDuplicatedPrimitives';

type Named = JsonMap & {
  name: string;
};

function isNamed(obj: Json): obj is Named {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    !Array.isArray(obj) &&
    'name' in obj
  );
}

const ensureAllNamed = (arr: JsonArray): Named[] => {
  return arr.map(a => {
    if (isNamed(a)) {
      return a;
    }

    throw new Error(`Unnamed step! ${JSON.stringify(a)}`);
  });
};

const mergeSteps = (a: JsonArray, b: JsonArray): JsonArray => {
  const stepsA = ensureAllNamed(a);
  const stepsB = ensureAllNamed(b);

  const joined = stepsA.outerJoin(stepsB, (l, r) => l.name === r.name);

  return joined.map(({ left, right }) => {
    return right ?? left;
  });
};

export const githubWorkflowMerger: MergeFunction = fileContents => {
  const yamlContents = fileContents.map(f => yaml.parse(f) as Json);

  if (yamlContents.some(o => typeof o !== 'object')) {
    const last = yamlContents.last();

    if (!last) {
      throw new Error('Merge function called with no contents');
    }

    return yaml.stringify(last);
  }

  const mergeOptions: merge.Options = {
    customMerge: key => {
      if (key === 'steps') {
        return mergeSteps;
      }
      return undefined;
    }
  };

  const merged = merge.all(
    yamlContents.compact() as (JsonMap | JsonArray)[],
    mergeOptions
  ) as Json;

  squashDuplicatedPrimitives(merged);

  const str = yaml.stringify(merged);

  return prettier.format(str, { ...PRETTIER_STYLE, parser: 'yaml' });
};
