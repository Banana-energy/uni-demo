import uni from '@uni-helper/eslint-config'

export default uni({
  unocss: true,
  vue: true,
  ignores: ['eslint.config.mjs'],
  typescript: {
    overrides: {
      'ts/no-namespace': 'off',
      'ts/no-empty-object-type': 'off',
      'ts/consistent-type-imports': [
        'error',
        {
          fixStyle: 'inline-type-imports',
          disallowTypeAnnotations: false,
        },
      ],
    },
  },
  rules: {
    'no-magic-numbers': ['error', {
      ignoreArrayIndexes: true,
      enforceConst: true,
      detectObjects: true,
    }],
    'unocss/order-attributify': 'off',
    'vue/component-definition-name-casing': ['error', 'PascalCase'],
    'vue/attribute-hyphenation': [
      'error',
      'always',
      {
        ignore: [],
      },
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/multi-word-component-names': 'error',
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        registeredComponentsOnly: false,
        ignores: [],
      },
    ],
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'always',
      },
    ],
    'style/array-bracket-spacing': ['error', 'always'],
    'vue/attributes-order': [
      'error',
      {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          ['UNIQUE', 'SLOT'],
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'ATTR_DYNAMIC',
          'ATTR_STATIC',
          'ATTR_SHORTHAND_BOOL',
          'EVENTS',
          'CONTENT',
        ],
        alphabetical: true,
      },
    ],
    'vue/v-on-event-hyphenation': [
      'error',
      'always',
      {
        autofix: true,
        ignore: [],
      },
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 3,
        },
        multiline: {
          max: 1,
        },
      },
    ],
    'prefer-promise-reject-errors': 'off',
    'no-console': 'off',
    'sort-imports': ['error'],
    'style/space-before-function-paren': 'off',
    'style/indent': ['error', 2, {
      SwitchCase: 1,
    }],
    'style/object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          multiline: true,
          minProperties: 1,
        },
        ObjectPattern: {
          multiline: true,
          minProperties: 2,
        },
        ImportDeclaration: {
          multiline: true,
          minProperties: 4,
        },
        ExportDeclaration: {
          multiline: true,
          minProperties: 1,
        },
      },
    ],
    'style/comma-dangle': ['error', 'always'],
    'style/object-curly-spacing': ['error', 'always'],
    'style/object-property-newline': ['error', {
      allowAllPropertiesOnSameLine: false,
    }],
    'style/operator-linebreak': ['error', 'after'],
  },
})
