import eslintPluginVue from 'eslint-plugin-vue'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'
import preferArrow from 'eslint-plugin-prefer-arrow'

export default [
    {
        name: 'app/files',
        files: ['**/*.{js,ts}'],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module'
            },
            globals: {
                console: 'readonly',
                document: 'readonly',
                window: 'readonly',
                process: 'readonly'
            }
        },
        plugins: {
            '@typescript-eslint': tseslint,
            'prefer-arrow': preferArrow
        },
        rules: {
            'no-console': 1,
            'no-debugger': 1,
            'no-unused-vars': 0,
            '@typescript-eslint/no-unused-vars': [2, { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-explicit-any': 1,
            '@typescript-eslint/no-inferrable-types': 2,
            'prefer-arrow-callback': 2,
            'prefer-arrow/prefer-arrow-functions': 2
        }
    },
    {
        name: 'app/vue3-recommended',
        ...eslintPluginVue.configs['vue3-recommended']
    },
    {
        name: 'app/vue-files',
        files: ['**/*.vue'],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                ecmaVersion: 'latest',
                parser: tsparser
            },
            globals: {
                console: 'readonly',
                document: 'readonly',
                window: 'readonly',
                process: 'readonly'
            }
        },
        plugins: {
            vue: eslintPluginVue,
            '@typescript-eslint': tseslint,
            'prefer-arrow': preferArrow
        },
        rules: {
            'no-console': 1,
            'no-debugger': 1,
            'no-unused-vars': 0,
            '@typescript-eslint/no-unused-vars': [2, { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-explicit-any': 1,
            '@typescript-eslint/no-inferrable-types': 2,
            'prefer-arrow-callback': 2,
            'prefer-arrow/prefer-arrow-functions': 2,
            'vue/multi-word-component-names': 0,
            'vue/v-bind-style': [2, 'shorthand', { sameNameShorthand: 'always' }]
        }
    }
]
