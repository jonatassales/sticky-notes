import baseConfig from "@repo/eslint-config/base";

/** @type {import("eslint").Linter.Config} */
export default [
  {
    ignores: ["dist/**"],
  },
  {
    ...baseConfig,
    rules: {
      ...baseConfig.rules,

      // These are optional but recommended for type-only packages:
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",

      // Type/interface-heavy packages often need:
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],

      // Usually DTOs and contracts do not need explicit exports:
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
  },
];
