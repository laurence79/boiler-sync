import handlebars from 'handlebars';
import fs from 'fs';

export const expandHandlebars = (
  filename: string,
  parameterValues: Record<string, string>
): string => {
  const templateContent = fs.readFileSync(filename, 'utf-8');

  const template = handlebars.compile(templateContent);

  const content = template(parameterValues);

  return content;
};
