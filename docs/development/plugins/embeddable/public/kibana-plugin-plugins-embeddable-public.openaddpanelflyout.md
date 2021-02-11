<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-plugins-embeddable-public](./kibana-plugin-plugins-embeddable-public.md) &gt; [openAddPanelFlyout](./kibana-plugin-plugins-embeddable-public.openaddpanelflyout.md)

## openAddPanelFlyout() function

<b>Signature:</b>

```typescript
export declare function openAddPanelFlyout(options: {
    embeddable: IContainer;
    getFactory: EmbeddableStart['getEmbeddableFactory'];
    getAllFactories: EmbeddableStart['getEmbeddableFactories'];
    overlays: OverlayStart;
    notifications: NotificationsStart;
    SavedObjectFinder: React.ComponentType<any>;
}): OverlayRef;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  options | <code>{</code><br/><code>    embeddable: IContainer;</code><br/><code>    getFactory: EmbeddableStart['getEmbeddableFactory'];</code><br/><code>    getAllFactories: EmbeddableStart['getEmbeddableFactories'];</code><br/><code>    overlays: OverlayStart;</code><br/><code>    notifications: NotificationsStart;</code><br/><code>    SavedObjectFinder: React.ComponentType&lt;any&gt;;</code><br/><code>}</code> |  |

<b>Returns:</b>

`OverlayRef`
