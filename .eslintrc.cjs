/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: ['prettier', 'import'],
  rules: {
    'prettier/prettier': 1, // warning
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true, // don"t want to sort import lines, use eslint-plugin-import instead
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: true
      }
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin', // Built-in imports (come from NodeJS native) go first
          'external', // <- External imports
          'internal', // <- Absolute imports
          ['parent', 'sibling'], // <- Relative imports, the sibling and parent types they can be mingled together
          'index', // <- index imports
          'type',
          'object',
          'unknown' // <- unknown
        ],
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: 'vue',
            group: 'builtin',
            position: 'before'
          },
          {
            pattern: '@/**',
            group: 'internal',
            position: 'after'
          }
        ],
        pathGroupsExcludedImportTypes: ['vue', 'type'],
        alphabetize: {
          /* sort in ascending order. Options: ["ignore", "asc", "desc"] */
          order: 'asc',
          /* ignore case. Options: [true, false] */
          caseInsensitive: true
        }
      }
    ]
  }
}
