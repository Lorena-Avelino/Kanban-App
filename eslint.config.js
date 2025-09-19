import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";
import mantine from 'eslint-config-mantine'
import { globalIgnores } from "eslint/config";

export default tseslint.config(
  ...mantine,
  [
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx, mjs, cjs, js, d.ts, d.mts}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
      "plugin:prettier/recommended",
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      prettier,
    },
    rules: {
      "prettier/prettier": "warn",
    },
  },
]);
