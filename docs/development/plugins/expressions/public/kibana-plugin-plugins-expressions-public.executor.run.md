<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-plugins-expressions-public](./kibana-plugin-plugins-expressions-public.md) &gt; [Executor](./kibana-plugin-plugins-expressions-public.executor.md) &gt; [run](./kibana-plugin-plugins-expressions-public.executor.run.md)

## Executor.run() method

Execute expression and return result.

<b>Signature:</b>

```typescript
run<Input, Output>(ast: string | ExpressionAstExpression, input: Input, params?: ExpressionExecutionParams): Promise<Output>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  ast | <code>string &#124; ExpressionAstExpression</code> |  |
|  input | <code>Input</code> |  |
|  params | <code>ExpressionExecutionParams</code> |  |

<b>Returns:</b>

`Promise<Output>`
