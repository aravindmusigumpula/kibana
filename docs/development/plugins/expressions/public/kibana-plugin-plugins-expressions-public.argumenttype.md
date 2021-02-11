<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-plugins-expressions-public](./kibana-plugin-plugins-expressions-public.md) &gt; [ArgumentType](./kibana-plugin-plugins-expressions-public.argumenttype.md)

## ArgumentType type

This type represents all of the possible combinations of properties of an Argument in an Expression Function. The presence or absence of certain fields influence the shape and presence of others within each `arg` in the specification.

<b>Signature:</b>

```typescript
export declare type ArgumentType<T> = SingleArgumentType<T> | MultipleArgumentType<T> | UnresolvedSingleArgumentType<T> | UnresolvedMultipleArgumentType<T>;
```