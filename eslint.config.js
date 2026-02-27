import eslintPluginVue from 'eslint-plugin-vue';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import vueParser from 'vue-eslint-parser';

export default [
    {
        name: 'app/files',
        files: ['**/*.{js,ts}'],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
            globals: {
                console: 'readonly',
                document: 'readonly',
                window: 'readonly',
                process: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
        },
        rules: {
            'no-console': 'warn',
            'no-debugger': 'warn',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-explicit-any': 'warn',
        },
    },
    {
        name: 'app/vue-files',
        files: ['**/*.vue'],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                ecmaVersion: 'latest',
                parser: tsparser,
            },
            globals: {
                console: 'readonly',
                document: 'readonly',
                window: 'readonly',
                process: 'readonly',
            },
        },
        plugins: {
            vue: eslintPluginVue,
            '@typescript-eslint': tseslint,
        },
        rules: {
            'no-console': 'warn',
            'no-debugger': 'warn',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-explicit-any': 'warn',
            'vue/multi-word-component-names': 'off',
            'vue/no-v-html': 'off',
        },
    },
    {
        name: 'app/vue3-recommended',
        ...eslintPluginVue.configs['vue3-recommended'],
    },
];
