import { Result } from '@laurence79/ts-results';
import Ajv from 'ajv';
import { FileLoadFail } from '../types/FileLoadFail';
import { TemplateConfig } from '../types/TemplateConfig';
import schema from '../types/TemplateConfig.schema.json';
import { loadYamlFile } from './loadYamlFile';

const ajv = new Ajv();
const validator = ajv.compile<TemplateConfig>(schema);

export const loadTemplateConfigFile = (
  filename: string
): Result<TemplateConfig, FileLoadFail> => loadYamlFile(filename, validator);
