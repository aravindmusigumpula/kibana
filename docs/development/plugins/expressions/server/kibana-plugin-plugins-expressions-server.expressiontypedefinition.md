<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-plugins-expressions-server](./kibana-plugin-plugins-expressions-server.md) &gt; [ExpressionTypeDefinition](./kibana-plugin-plugins-expressions-server.expressiontypedefinition.md)

## ExpressionTypeDefinition interface

A generic type which represents a custom Expression Type Definition that's registered to the Interpreter.

<b>Signature:</b>

```typescript
export interface ExpressionTypeDefinition<Name extends string, Value extends ExpressionValueUnboxed | ExpressionValueBoxed, SerializedType = undefined> 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [deserialize](./kibana-plugin-plugins-expressions-server.expressiontypedefinition.deserialize.md) | <code>(type: SerializedType) =&gt; Value</code> |  |
|  [from](./kibana-plugin-plugins-expressions-server.expressiontypedefinition.from.md) | <code>{</code><br/><code>        [type: string]: ExpressionValueConverter&lt;any, Value&gt;;</code><br/><code>    }</code> |  |
|  [help](./kibana-plugin-plugins-expressions-server.expressiontypedefinition.help.md) | <code>string</code> |  |
|  [name](./kibana-plugin-plugins-expressions-server.expressiontypedefinition.name.md) | <code>Name</code> |  |
|  [serialize](./kibana-plugin-plugins-expressions-server.expressiontypedefinition.serialize.md) | <code>(type: Value) =&gt; SerializedType</code> |  |
|  [to](./kibana-plugin-plugins-expressions-server.expressiontypedefinition.to.md) | <code>{</code><br/><code>        [type: string]: ExpressionValueConverter&lt;Value, any&gt;;</code><br/><code>    }</code> |  |
|  [validate](./kibana-plugin-plugins-expressions-server.expressiontypedefinition.validate.md) | <code>(type: any) =&gt; void &#124; Error</code> |  |
