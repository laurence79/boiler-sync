module.exports = {
  root: true,
  env: { node: true },
  overrides: [
    {
      files: ['**/*.js'],
      extends: [
        'airbnb-base',
        'eslint:recommended',
        'plugin:prettier/recommended',
        'prettier/prettier'
      ],
      plugins: ['prettier']
    },
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json']
      },
      plugins: ['@typescript-eslint', 'prettier'],
      extends: [
        'airbnb-base',
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:prettier/recommended',
        'prettier/prettier'
      ],
      rules: {
        'import/prefer-default-export': 'off',
        '@typescript-eslint/unbound-method': 'off',
        'no-console': 'off',

        // clashes with no-floating-promises
        'no-void': 'off',

        // codelens does this for us
        '@typescript-eslint/lines-between-class-members': 'off'
      },
      overrides: [
        // non production code is more relaxed
        {
          files: ['*.spec.ts'],
          rules: {
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            'import/no-extraneous-dependencies': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
            'no-underscore-dangle': 'off',
            '@typescript-eslint/naming-convention': 'off'
          }
        }
      ]
    }
  ]
};
