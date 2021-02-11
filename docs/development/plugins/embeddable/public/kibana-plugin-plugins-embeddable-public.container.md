<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-plugins-embeddable-public](./kibana-plugin-plugins-embeddable-public.md) &gt; [Container](./kibana-plugin-plugins-embeddable-public.container.md)

## Container class

<b>Signature:</b>

```typescript
export declare abstract class Container<TChildInput extends Partial<EmbeddableInput> = {}, TContainerInput extends ContainerInput<TChildInput> = ContainerInput<TChildInput>, TContainerOutput extends ContainerOutput = ContainerOutput> extends Embeddable<TContainerInput, TContainerOutput> implements IContainer<TChildInput, TContainerInput, TContainerOutput> 
```

## Constructors

|  Constructor | Modifiers | Description |
|  --- | --- | --- |
|  [(constructor)(input, output, getFactory, parent)](./kibana-plugin-plugins-embeddable-public.container._constructor_.md) |  | Constructs a new instance of the <code>Container</code> class |

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [children](./kibana-plugin-plugins-embeddable-public.container.children.md) |  | <code>{</code><br/><code>        [key: string]: IEmbeddable&lt;any, any&gt; &#124; ErrorEmbeddable;</code><br/><code>    }</code> |  |
|  [getFactory](./kibana-plugin-plugins-embeddable-public.container.getfactory.md) |  | <code>EmbeddableStart['getEmbeddableFactory']</code> |  |
|  [isContainer](./kibana-plugin-plugins-embeddable-public.container.iscontainer.md) |  | <code>boolean</code> |  |

## Methods

|  Method | Modifiers | Description |
|  --- | --- | --- |
|  [addNewEmbeddable(type, explicitInput)](./kibana-plugin-plugins-embeddable-public.container.addnewembeddable.md) |  |  |
|  [createNewPanelState(factory, partial)](./kibana-plugin-plugins-embeddable-public.container.createnewpanelstate.md) |  |  |
|  [destroy()](./kibana-plugin-plugins-embeddable-public.container.destroy.md) |  |  |
|  [getChild(id)](./kibana-plugin-plugins-embeddable-public.container.getchild.md) |  |  |
|  [getChildIds()](./kibana-plugin-plugins-embeddable-public.container.getchildids.md) |  |  |
|  [getInheritedInput(id)](./kibana-plugin-plugins-embeddable-public.container.getinheritedinput.md) |  | Return state that comes from the container and is passed down to the child. For instance, time range and filters are common inherited input state. Note that any state stored in <code>this.input.panels[embeddableId].explicitInput</code> will override inherited input. |
|  [getInputForChild(embeddableId)](./kibana-plugin-plugins-embeddable-public.container.getinputforchild.md) |  |  |
|  [getPanelState(embeddableId)](./kibana-plugin-plugins-embeddable-public.container.getpanelstate.md) |  |  |
|  [reload()](./kibana-plugin-plugins-embeddable-public.container.reload.md) |  |  |
|  [removeEmbeddable(embeddableId)](./kibana-plugin-plugins-embeddable-public.container.removeembeddable.md) |  |  |
|  [untilEmbeddableLoaded(id)](./kibana-plugin-plugins-embeddable-public.container.untilembeddableloaded.md) |  |  |
|  [updateInputForChild(id, changes)](./kibana-plugin-plugins-embeddable-public.container.updateinputforchild.md) |  |  |
