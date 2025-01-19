# @pretty-cozy/eslint-config

A pretty cozy collection of eslint rules.

## Available configs

| config name | description                                   |
|-------------|-----------------------------------------------|
| `baseJs`    | General config without a specific usage scope |
| `baseTs`    | Extends `baseJs` with typescript support      |
| `react`     | React specific rule set                       |
| `peact`     | Preact specific rule set                      |
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
    
    export default [
      ...prettyCozy.baseTs,
      ...prettyCozy.react,
      {
        // your additional configuration
      },
      ...prettyCozy.prettier
    ]
    ```
3. Add npm scripts to your `package.json`:
    ```json
    "scripts": {
      "lint": "eslint src",
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

## The better setup

Above we created the eslint config by exporting an array.
However, `@typescript-eslint` provides an awesome utility to make writing configs a bit easier.

It adds a few quality of live improvements, like:
- nested config arrays (you no longer have to use the spread operator)
- correct types to provide auto-completion in your IDE
- a new `extends` field, to adjust shared configs

See the related [docs](https://typescript-eslint.io/packages/typescript-eslint#config) for more details.

Required changes:

1. Install `typescript-eslint` which exports the utility
    ```bash
    npm i -D typescript-eslint
    ```
2. Use the exported config utility:
    ```js
    import prettyCozy from "@pretty-cozy/eslint-config"
    import ts from "typescript-eslint"
   
    export default ts.config(
      prettyCozy.baseTs,
      prettyCozy.react,
      { 
        // your additional configuration
      },
      prettyCozy.prettier,
    )
    ```
