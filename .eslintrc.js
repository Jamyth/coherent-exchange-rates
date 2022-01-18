/** @type {import('eslint').Linter.Config} */
const config = {
    ignorePatterns: ['**/node_modules/**', '**/dist/**', '**/test/**', '**/api/**', "**/*.d.ts"],
    extends: ['iamyth/preset/react'],
    root: true,
    rules: {
        '@typescript-eslint/member-ordering': 'off'
    }
};

module.exports = config;
