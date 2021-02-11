<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-plugins-expressions-server](./kibana-plugin-plugins-expressions-server.md) &gt; [ExpressionFunctionDefinition](./kibana-plugin-plugins-expressions-server.expressionfunctiondefinition.md) &gt; [args](./kibana-plugin-plugins-expressions-server.expressionfunctiondefinition.args.md)

## ExpressionFunctionDefinition.args property

Specification of arguments that function supports. This list will also be used for autocomplete functionality when your function is being edited.

<b>Signature:</b>

```typescript
args: {
        [key in keyof Arguments]: ArgumentType<Arguments[key]>;
    };
```