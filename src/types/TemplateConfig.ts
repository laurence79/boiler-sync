import { TemplateSource } from './TemplateSource';

export type TemplateConfig = {
  /**
   * The schema version of this template configuration
   */
  version: 1;

  /**
   * A parent configuration to inherit from
   */
  inherits?: TemplateSource;

  /**
   * An array of parameter keys that a consumer should supply.
   */
  parameters?: string[];
};
