export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
  },
  plugins: [
    {
      rules: {
        'subject-pattern': ({ subject }) => {
          const pattern = /^RSS-ECOMM-\d{1,2}_\d{1,2}:\s[a-zA-Z0-9\s]+$/;
          const isValid = pattern.test(subject || '');
          return [
            isValid,
            '🐶 Commit message must look like: `chore(RSS-ECOMM-1_10): short description`',
          ];
        },
      },
    },
  ],
  rulesConfig: {
    'subject-pattern': [2, 'always'],
  },
};
