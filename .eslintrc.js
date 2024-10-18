module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ["eslint:recommended", "plugin:vue/essential"],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: "module",
	},
	plugins: ["vue"],
	rules: {
		"no-unused-vars": "warn",
		"no-undef": "warn",
		"no-unreachable": "warn",
		"no-console": "off",
		"no-constant-condition": "warn",
		indent: ["warn", "tab"],
	},
};
