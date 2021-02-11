<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-plugins-expressions-public](./kibana-plugin-plugins-expressions-public.md) &gt; [buildExpression](./kibana-plugin-plugins-expressions-public.buildexpression.md)

## buildExpression() function

Makes it easy to progressively build, update, and traverse an expression AST. You can either start with an empty AST, or provide an expression string, AST, or array of expression function builders to use as initial state.

<b>Signature:</b>

```typescript
export declare function buildExpression(initialState?: ExpressionAstFunctionBuilder[] | ExpressionAstExpression | string): ExpressionAstExpressionBuilder;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  initialState | <code>ExpressionAstFunctionBuilder[] &#124; ExpressionAstExpression &#124; string</code> |  |

<b>Returns:</b>

`ExpressionAstExpressionBuilder`
