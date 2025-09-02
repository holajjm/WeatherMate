module.exports = {
  root: true,
  env: { 
    browser: true, 
    node: true,       // Node.js 전역(process 등)을 인식하도록 추가
    es2020: true 
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:better-tailwindcss/recommended", // ✅ prefix 제거
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: {
    react: { version: "18.2" },
    "better-tailwindcss": {
      entryPoint: "src/global.css", // tailwindcss v4용
      tailwindConfig: "tailwind.config.js", // tailwindcss v3용
    },
  },
  plugins: [
    "react-refresh", 
    "better-tailwindcss" // ✅ prefix 제거
  ],
  rules: {
    "no-unused-vars": ["error", { varsIgnorePattern: "location" }],
    "react/jsx-no-target-blank": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
