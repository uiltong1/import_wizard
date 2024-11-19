module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-empty": [2, "never"],
    "subject-empty": [2, "never"],
    'scope-empty': [2, 'never'],  // O escopo não pode ser vazio se fornecido
  },
};
