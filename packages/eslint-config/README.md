# @pretty-cozy/eslint-config

A pretty cozy collection of eslint rules.

## Available configs

| config name | description |
|--- |--- |
| `@pretty-cozy/eslint-config/base` | General config without a specific usage scope |
| `@pretty-cozy/eslint-config/base-ts`| Replaces `/base` to support typescript |
| `@pretty-cozy/eslint-config/react` | React specific rule set |

## Setup

1. Install `eslint` and the package
    ```bash
    npm i -D eslint @pretty-cozy/eslint-config
    ```
2. Add an eslint configuration that extends on the configs you need. 
   For example, you can add this to your `package.json`:
    ```json
    "eslintConfig": {
      "extends": [
        "@pretty-cozy/eslint-config/base-ts",
        "@pretty-cozy/eslint-config/react"
      ]
    }
    ```
3. Add npm scripts to your `package.json`:
    ```json
    "scripts": {
      "lint": "eslint ./src",
      "lint:fix": "npx lint -- --fix"
    }
    ```

## Usage

You can use eslint by executing the created scripts:

```bash
# Lint your code and print the result
npm run lint 

# Autofix linter problems where possible
npm run lint:fix
```
