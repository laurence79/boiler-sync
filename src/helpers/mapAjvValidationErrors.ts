import { ErrorObject } from 'ajv';

export const mapAjvValidationErrors = (
  errors?: ErrorObject[] | null
): string[] => {
  return errors?.compactMap(e => e.message) ?? [];
};
