import { Json, JsonArray, JsonMap } from '@laurence79/ts-json';
import merge from 'deepmerge';
import { squashDuplicatedPrimitives } from './squashDuplicatedPrimitives';

export const objectMerger = (obj: Json[]): Json => {
  if (obj.some(o => typeof o !== 'object')) {
    return obj.last() ?? null;
  }
  const merged = merge.all(obj.compact() as (JsonMap | JsonArray)[]) as Json;
  squashDuplicatedPrimitives(merged);
  return merged;
};
