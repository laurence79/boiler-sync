import { Json, JsonArray, JsonMap } from '@laurence79/ts-json';
import merge from 'deepmerge';

const squashDuplicatedPrimitives = (json: Json): void => {
  if (typeof json === 'object') {
    if (Array.isArray(json)) {
      const primitives: Json[] = [];
      const others: Json[] = [];
      while (json.length > 0) {
        const element = json.shift();
        if (element) {
          if (typeof element === 'object') {
            squashDuplicatedPrimitives(element);
            others.push(element);
          } else {
            primitives.push(element);
          }
        }
      }
      primitives.distinct().forEach(e => json.push(e));
      others.forEach(e => json.push(e));
      return;
    }
    if (json === null) {
      return;
    }
    Object.keys(json).forEach(k => squashDuplicatedPrimitives(json[k]));
  }
};

export const objectMerger = (obj: Json[]): Json => {
  if (obj.some(o => typeof o !== 'object')) {
    return obj.last() ?? null;
  }
  const merged = merge.all(obj.compact() as (JsonMap | JsonArray)[]) as Json;
  squashDuplicatedPrimitives(merged);
  return merged;
};
