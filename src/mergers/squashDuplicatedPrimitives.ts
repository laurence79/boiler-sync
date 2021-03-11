import { Json } from '@laurence79/ts-json';

export const squashDuplicatedPrimitives = (json: Json): void => {
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
