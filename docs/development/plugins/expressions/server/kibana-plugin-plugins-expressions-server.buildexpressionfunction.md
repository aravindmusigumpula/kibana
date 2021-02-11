<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-plugins-expressions-server](./kibana-plugin-plugins-expressions-server.md) &gt; [buildExpressionFunction](./kibana-plugin-plugins-expressions-server.buildexpressionfunction.md)

## buildExpressionFunction() function

Manages an AST for a single expression function. The return value can be provided to `buildExpression` to add this function to an expression.

Note that to preserve type safety and ensure no args are missing, all required arguments for the specified function must be provided up front. If desired, they can be changed or removed later.

<b>Signature:</b>

```typescript
export declare function buildExpressionFunction<FnDef extends AnyExpressionFunctionDefinition = AnyExpressionFunctionDefinition>(fnName: InferFunctionDefinition<FnDef>['name'], 
initialArgs: {
    [K in keyof FunctionArgs<FnDef>]: FunctionArgs<FnDef>[K] | ExpressionAstExpressionBuilder | ExpressionAstExpressionBuilder[];
}): ExpressionAstFunctionBuilder<FnDef>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  fnName | <code>InferFunctionDefinition&lt;FnDef&gt;['name']</code> |  |
|  initialArgs | <code>{</code><br/><code>    [K in keyof FunctionArgs&lt;FnDef&gt;]: FunctionArgs&lt;FnDef&gt;[K] &#124; ExpressionAstExpressionBuilder &#124; ExpressionAstExpressionBuilder[];</code><br/><code>}</code> |  |

<b>Returns:</b>

`ExpressionAstFunctionBuilder<FnDef>`
