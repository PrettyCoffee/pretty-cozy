import { meta } from "../meta.ts"
import type { JSRuleDefinition, Linter } from "eslint"

export type RuleDef = JSRuleDefinition & {
  name: string
  meta: {
    docs: {
      description: string
      recommended: Linter.RuleEntry
    }
  }
}

export const createRule = (rule: RuleDef): RuleDef => {
  rule.meta.docs.url = meta.repoUrl
  return rule
}

export type ESLintRule = ReturnType<typeof createRule>
type RuleCreator = RuleDef["create"]
type RuleEffects = ReturnType<RuleCreator>

export type RuleContext = Parameters<RuleCreator>[0]
export type SourceNode<NodeType extends keyof RuleEffects = keyof RuleEffects> =
  Parameters<NonNullable<RuleEffects[NodeType]>>[0]
