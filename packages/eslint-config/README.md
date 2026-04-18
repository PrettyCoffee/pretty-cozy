# @pretty-cozy/eslint-config

A pretty cozy collection of eslint rules.

## Available configs

| config name | description                                   |
|-------------|-----------------------------------------------|
| `baseJs`    | General config without a specific usage scope |
| `baseTs`    | Extends `baseJs` with typescript support      |
| `react`     | React specific rule set                       |
| `preact`     | Preact specific rule set                      |
| `prettier`  | Enables prettier for eslint.                  |
| `tailwind`  | Tailwind css specific rule set                |

## Setup

1. Install `eslint` and the package
    ```bash
    npm i -D eslint @pretty-cozy/eslint-config
    ```
2. Add an `eslint.config.mjs` file at the root directory of your project for configuration.
    ```js
    import prettyCozy from "@pretty-cozy/eslint-config"
    import { defineConfig } from "eslint/config"
    
    export default defineConfig(
      prettyCozy.baseTs,
      prettyCozy.react,
      {
        // your additional configuration
      },
      prettyCozy.prettier
    )
    ```
3. Add npm scripts to your `package.json`:
    ```json
    "scripts": {
      "lint": "eslint src",
      "lint:fix": "npm run lint -- --fix"
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
