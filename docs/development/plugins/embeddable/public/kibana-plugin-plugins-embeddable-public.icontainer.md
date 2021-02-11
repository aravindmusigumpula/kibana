<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-plugins-embeddable-public](./kibana-plugin-plugins-embeddable-public.md) &gt; [IContainer](./kibana-plugin-plugins-embeddable-public.icontainer.md)

## IContainer interface

<b>Signature:</b>

```typescript
export interface IContainer<Inherited extends {} = {}, I extends ContainerInput<Inherited> = ContainerInput<Inherited>, O extends ContainerOutput = ContainerOutput> extends IEmbeddable<I, O> 
```

## Methods

|  Method | Description |
|  --- | --- |
|  [addNewEmbeddable(type, explicitInput)](./kibana-plugin-plugins-embeddable-public.icontainer.addnewembeddable.md) | Adds a new embeddable to the container. <code>explicitInput</code> may partially specify the required embeddable input, but the remainder must come from inherited container state. |
|  [getChild(id)](./kibana-plugin-plugins-embeddable-public.icontainer.getchild.md) | Returns the child embeddable with the given id. |
|  [getInputForChild(id)](./kibana-plugin-plugins-embeddable-public.icontainer.getinputforchild.md) | Returns the input for the given child. Uses a combination of explicit input for the child stored on the parent and derived/inherited input taken from the container itself. |
|  [removeEmbeddable(embeddableId)](./kibana-plugin-plugins-embeddable-public.icontainer.removeembeddable.md) | Removes the embeddable with the given id. |
|  [untilEmbeddableLoaded(id)](./kibana-plugin-plugins-embeddable-public.icontainer.untilembeddableloaded.md) | Call if you want to wait until an embeddable with that id has finished loading. |
|  [updateInputForChild(id, changes)](./kibana-plugin-plugins-embeddable-public.icontainer.updateinputforchild.md) | Changes the input for a given child. Note, this will override any inherited state taken from the container itself. |
