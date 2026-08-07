import { type Scope, type Rule } from "eslint"

import { createRule } from "../utils/create-rule.ts"

type ClassNode = Extract<Scope.DefinitionType, { type: "ClassName" }>["node"]

const isErrorBoundary = (node: ClassNode & Rule.NodeParentExtension) =>
  node.body.body.some(member => {
    if (member.type !== "MethodDefinition") return false

    const key = member.key as { type?: string; name?: string; value?: unknown }

    if (key.type === "Identifier") {
      return (
        key.name === "componentDidCatch" ||
        key.name === "getDerivedStateFromError"
      )
    }

    if (key.type === "Literal" && typeof key.value === "string") {
      return (
        key.value === "componentDidCatch" ||
        key.value === "getDerivedStateFromError"
      )
    }

    return false
  })

const hasSuper = {
  Component: "[superClass.name='Component']",
  PureComponent: "[superClass.name='PureComponent']",

  "React.Component":
    "[superClass.object.name='React'][superClass.property.name='Component']",
  "React.PureComponent":
    "[superClass.object.name='React'][superClass.property.name='PureComponent']",
}

export default createRule({
  name: "prefer-function-component",
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallows React class components.",
      recommended: "error",
    },
    messages: {
      preferFunctionComponent:
        "Use function components in favor of class components.",
    },
    schema: [],
  },
  create: context => {
    const analyze = (node: ClassNode & Rule.NodeParentExtension) => {
      if (isErrorBoundary(node)) return
      context.report({ node, messageId: "preferFunctionComponent" })
    }

    return {
      [`ClassDeclaration${hasSuper.Component}`]: analyze,
      [`ClassExpression${hasSuper.Component}`]: analyze,

      [`ClassDeclaration${hasSuper.PureComponent}`]: analyze,
      [`ClassExpression${hasSuper.PureComponent}`]: analyze,

      [`ClassDeclaration${hasSuper["React.Component"]}`]: analyze,
      [`ClassExpression${hasSuper["React.Component"]}`]: analyze,

      [`ClassDeclaration${hasSuper["React.PureComponent"]}`]: analyze,
      [`ClassExpression${hasSuper["React.PureComponent"]}`]: analyze,
    }
  },
})
