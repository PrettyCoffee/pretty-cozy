# @pretty-cozy/git-hooks

A pretty cozy collection of git hooks to verify commit messages and lint your code.

## Setup

1. Install the package
    ```bash
    npm i -D @pretty-cozy/git-hooks
    ```
2. Add a lint-staged config to your `package.json`:
    ```json
    "lint-staged": {
      "*.{ts,tsx}": [
        "npm run lint:fix"
      ]
    }
    ```
3. Add a `prepare` script to your `package.json` to auto install the hooks on `npm i`:
    ```json
    "scripts": {
      "prepare": "cozy-git-hooks install --quiet"
    }
    ```
