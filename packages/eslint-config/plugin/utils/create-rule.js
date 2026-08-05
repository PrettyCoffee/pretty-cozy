import { meta } from "../meta.js"

export const createRule = rule => {
  rule.meta.docs.url = meta.repoUrl
  return rule
}
