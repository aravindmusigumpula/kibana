<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-plugins-expressions-server](./kibana-plugin-plugins-expressions-server.md) &gt; [KnownTypeToString](./kibana-plugin-plugins-expressions-server.knowntypetostring.md)

## KnownTypeToString type

Map the type of the generic to a string-based representation of the type.

If the provided generic is its own type interface, we use the value of the `type` key as a string literal type for it.

<b>Signature:</b>

```typescript
export declare type KnownTypeToString<T> = T extends string ? 'string' : T extends boolean ? 'boolean' : T extends number ? 'number' : T extends null ? 'null' : T extends {
    type: string;
} ? T['type'] : never;
```