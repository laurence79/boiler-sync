import { TemplateSource } from './TemplateSource';

export type ProjectConfig = {
  /**
   * The schema version of this project configuration.
   */
  version: 1;

  /**
   * The source of the template that this project uses.
   */
  uses: TemplateSource;

  /**
   * The parameters that the template requires.
   */
  parameters?: Record<string, string>;
};
