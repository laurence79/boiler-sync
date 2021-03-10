import { Result } from '@laurence79/ts-results';
import Ajv from 'ajv';
import { FileLoadFail } from '../types/FileLoadFail';
import { ProjectConfig } from '../types/ProjectConfig';
import schema from '../types/ProjectConfig.schema.json';
import { loadYamlFile } from './loadYamlFile';

const ajv = new Ajv();
const validator = ajv.compile<ProjectConfig>(schema);

export const loadProjectConfigFile = (
  filename: string
): Result<ProjectConfig, FileLoadFail> => loadYamlFile(filename, validator);
