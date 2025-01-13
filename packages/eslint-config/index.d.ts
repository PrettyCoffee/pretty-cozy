import { ConfigArray } from "typescript-eslint";

declare const configs: {
    base: ConfigArray;
    baseTs: ConfigArray;
    react: ConfigArray;
    preact: ConfigArray;
    prettier: ConfigArray;
    tailwind: ConfigArray;
};
export default configs;
