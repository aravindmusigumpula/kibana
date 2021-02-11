<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-plugins-embeddable-public](./kibana-plugin-plugins-embeddable-public.md) &gt; [IContainer](./kibana-plugin-plugins-embeddable-public.icontainer.md) &gt; [getInputForChild](./kibana-plugin-plugins-embeddable-public.icontainer.getinputforchild.md)

## IContainer.getInputForChild() method

Returns the input for the given child. Uses a combination of explicit input for the child stored on the parent and derived/inherited input taken from the container itself.

<b>Signature:</b>

```typescript
getInputForChild<EEI extends EmbeddableInput>(id: string): EEI;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  id | <code>string</code> |  |

<b>Returns:</b>

`EEI`
