module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [2, "always", ["core", "react", "react-native"]],
    "scope-empty": [0, "never"],
  },
};
