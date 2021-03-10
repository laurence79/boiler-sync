import { Json } from '@laurence79/ts-json';
import { Result, success, fail } from '@laurence79/ts-results';
import fs from 'fs';
import yaml from 'yaml';
import { ValidateFunction } from 'ajv';
import { FileLoadFail } from '../types/FileLoadFail';
import { mapAjvValidationErrors } from '../helpers';

export const loadYamlFile = <T>(
  filename: string,
  validator: ValidateFunction<T>
): Result<T, FileLoadFail> => {
  if (!fs.existsSync(filename)) {
    return fail({ code: 'FILE_DOES_NOT_EXIST' });
  }

  const fileContent = fs.readFileSync(filename, 'utf-8');

  const source = yaml.parse(fileContent) as Json;

  if (validator(source)) {
    return success(source);
  }

  return fail({
    code: 'PARSER_FAIL',
    errors: mapAjvValidationErrors(validator.errors)
  });
};
