module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/vue3-recommended", "eslint:recommended"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    "vue/no-multiple-template-root": "off",
    'vue/singleline-html-element-content-newline': 'off',
  },
};
