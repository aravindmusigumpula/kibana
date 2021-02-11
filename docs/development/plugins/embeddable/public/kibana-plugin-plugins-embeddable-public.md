<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-plugins-embeddable-public](./kibana-plugin-plugins-embeddable-public.md)

## kibana-plugin-plugins-embeddable-public package

## Classes

|  Class | Description |
|  --- | --- |
|  [AddPanelAction](./kibana-plugin-plugins-embeddable-public.addpanelaction.md) |  |
|  [AttributeService](./kibana-plugin-plugins-embeddable-public.attributeservice.md) |  |
|  [Container](./kibana-plugin-plugins-embeddable-public.container.md) |  |
|  [EditPanelAction](./kibana-plugin-plugins-embeddable-public.editpanelaction.md) |  |
|  [Embeddable](./kibana-plugin-plugins-embeddable-public.embeddable.md) |  |
|  [EmbeddableChildPanel](./kibana-plugin-plugins-embeddable-public.embeddablechildpanel.md) | This component can be used by embeddable containers using react to easily render children. It waits for the child to be initialized, showing a loading indicator until that is complete. |
|  [EmbeddableFactoryNotFoundError](./kibana-plugin-plugins-embeddable-public.embeddablefactorynotfounderror.md) |  |
|  [EmbeddablePanel](./kibana-plugin-plugins-embeddable-public.embeddablepanel.md) |  |
|  [EmbeddableRoot](./kibana-plugin-plugins-embeddable-public.embeddableroot.md) |  |
|  [EmbeddableStateTransfer](./kibana-plugin-plugins-embeddable-public.embeddablestatetransfer.md) | A wrapper around the session storage which provides strongly typed helper methods for common incoming and outgoing states used by the embeddable infrastructure. |
|  [ErrorEmbeddable](./kibana-plugin-plugins-embeddable-public.errorembeddable.md) |  |
|  [PanelNotFoundError](./kibana-plugin-plugins-embeddable-public.panelnotfounderror.md) |  |

## Enumerations

|  Enumeration | Description |
|  --- | --- |
|  [ViewMode](./kibana-plugin-plugins-embeddable-public.viewmode.md) |  |

## Functions

|  Function | Description |
|  --- | --- |
|  [isErrorEmbeddable(embeddable)](./kibana-plugin-plugins-embeddable-public.iserrorembeddable.md) |  |
|  [isReferenceOrValueEmbeddable(incoming)](./kibana-plugin-plugins-embeddable-public.isreferenceorvalueembeddable.md) |  |
|  [isSavedObjectEmbeddableInput(input)](./kibana-plugin-plugins-embeddable-public.issavedobjectembeddableinput.md) |  |
|  [openAddPanelFlyout(options)](./kibana-plugin-plugins-embeddable-public.openaddpanelflyout.md) |  |
|  [plugin(initializerContext)](./kibana-plugin-plugins-embeddable-public.plugin.md) |  |

## Interfaces

|  Interface | Description |
|  --- | --- |
|  [Adapters](./kibana-plugin-plugins-embeddable-public.adapters.md) | The interface that the adapters used to open an inspector have to fullfill. |
|  [ContainerInput](./kibana-plugin-plugins-embeddable-public.containerinput.md) |  |
|  [ContainerOutput](./kibana-plugin-plugins-embeddable-public.containeroutput.md) |  |
|  [EmbeddableChildPanelProps](./kibana-plugin-plugins-embeddable-public.embeddablechildpanelprops.md) |  |
|  [EmbeddableContext](./kibana-plugin-plugins-embeddable-public.embeddablecontext.md) |  |
|  [EmbeddableEditorState](./kibana-plugin-plugins-embeddable-public.embeddableeditorstate.md) | A state package that contains information an editor will need to create or edit an embeddable then redirect back. |
|  [EmbeddableFactory](./kibana-plugin-plugins-embeddable-public.embeddablefactory.md) | EmbeddableFactories create and initialize an embeddable instance |
|  [EmbeddableInstanceConfiguration](./kibana-plugin-plugins-embeddable-public.embeddableinstanceconfiguration.md) |  |
|  [EmbeddableOutput](./kibana-plugin-plugins-embeddable-public.embeddableoutput.md) |  |
|  [EmbeddablePackageState](./kibana-plugin-plugins-embeddable-public.embeddablepackagestate.md) | A state package that contains all fields necessary to create or update an embeddable by reference or by value in a container. |
|  [EmbeddableSetup](./kibana-plugin-plugins-embeddable-public.embeddablesetup.md) |  |
|  [EmbeddableSetupDependencies](./kibana-plugin-plugins-embeddable-public.embeddablesetupdependencies.md) |  |
|  [EmbeddableStart](./kibana-plugin-plugins-embeddable-public.embeddablestart.md) |  |
|  [EmbeddableStartDependencies](./kibana-plugin-plugins-embeddable-public.embeddablestartdependencies.md) |  |
|  [EnhancementRegistryDefinition](./kibana-plugin-plugins-embeddable-public.enhancementregistrydefinition.md) |  |
|  [IContainer](./kibana-plugin-plugins-embeddable-public.icontainer.md) |  |
|  [IEmbeddable](./kibana-plugin-plugins-embeddable-public.iembeddable.md) |  |
|  [OutputSpec](./kibana-plugin-plugins-embeddable-public.outputspec.md) |  |
|  [PanelState](./kibana-plugin-plugins-embeddable-public.panelstate.md) |  |
|  [PropertySpec](./kibana-plugin-plugins-embeddable-public.propertyspec.md) |  |
|  [RangeSelectContext](./kibana-plugin-plugins-embeddable-public.rangeselectcontext.md) |  |
|  [ReferenceOrValueEmbeddable](./kibana-plugin-plugins-embeddable-public.referenceorvalueembeddable.md) | Any embeddable that implements this interface will be able to use input that is either by reference (backed by a saved object) OR by value, (provided by the container). |
|  [SavedObjectEmbeddableInput](./kibana-plugin-plugins-embeddable-public.savedobjectembeddableinput.md) |  |
|  [ValueClickContext](./kibana-plugin-plugins-embeddable-public.valueclickcontext.md) |  |

## Variables

|  Variable | Description |
|  --- | --- |
|  [ACTION\_ADD\_PANEL](./kibana-plugin-plugins-embeddable-public.action_add_panel.md) |  |
|  [ACTION\_EDIT\_PANEL](./kibana-plugin-plugins-embeddable-public.action_edit_panel.md) |  |
|  [ATTRIBUTE\_SERVICE\_KEY](./kibana-plugin-plugins-embeddable-public.attribute_service_key.md) | The attribute service is a shared, generic service that embeddables can use to provide the functionality required to fulfill the requirements of the ReferenceOrValueEmbeddable interface. The attribute\_service can also be used as a higher level wrapper to transform an embeddable input shape that references a saved object into an embeddable input shape that contains that saved object's attributes by value. |
|  [CONTEXT\_MENU\_TRIGGER](./kibana-plugin-plugins-embeddable-public.context_menu_trigger.md) |  |
|  [contextMenuTrigger](./kibana-plugin-plugins-embeddable-public.contextmenutrigger.md) |  |
|  [defaultEmbeddableFactoryProvider](./kibana-plugin-plugins-embeddable-public.defaultembeddablefactoryprovider.md) |  |
|  [EmbeddableRenderer](./kibana-plugin-plugins-embeddable-public.embeddablerenderer.md) | Helper react component to render an embeddable Can be used if you have an embeddable object or an embeddable factory Supports updating input by passing <code>input</code> prop |
|  [isContextMenuTriggerContext](./kibana-plugin-plugins-embeddable-public.iscontextmenutriggercontext.md) |  |
|  [isEmbeddable](./kibana-plugin-plugins-embeddable-public.isembeddable.md) |  |
|  [isRangeSelectTriggerContext](./kibana-plugin-plugins-embeddable-public.israngeselecttriggercontext.md) |  |
|  [isRowClickTriggerContext](./kibana-plugin-plugins-embeddable-public.isrowclicktriggercontext.md) |  |
|  [isValueClickTriggerContext](./kibana-plugin-plugins-embeddable-public.isvalueclicktriggercontext.md) |  |
|  [PANEL\_BADGE\_TRIGGER](./kibana-plugin-plugins-embeddable-public.panel_badge_trigger.md) |  |
|  [PANEL\_NOTIFICATION\_TRIGGER](./kibana-plugin-plugins-embeddable-public.panel_notification_trigger.md) |  |
|  [panelBadgeTrigger](./kibana-plugin-plugins-embeddable-public.panelbadgetrigger.md) |  |
|  [panelNotificationTrigger](./kibana-plugin-plugins-embeddable-public.panelnotificationtrigger.md) |  |
|  [withEmbeddableSubscription](./kibana-plugin-plugins-embeddable-public.withembeddablesubscription.md) |  |

## Type Aliases

|  Type Alias | Description |
|  --- | --- |
|  [ChartActionContext](./kibana-plugin-plugins-embeddable-public.chartactioncontext.md) |  |
|  [EmbeddableFactoryDefinition](./kibana-plugin-plugins-embeddable-public.embeddablefactorydefinition.md) |  |
|  [EmbeddableInput](./kibana-plugin-plugins-embeddable-public.embeddableinput.md) |  |
|  [EmbeddablePanelHOC](./kibana-plugin-plugins-embeddable-public.embeddablepanelhoc.md) |  |
|  [EmbeddableRendererProps](./kibana-plugin-plugins-embeddable-public.embeddablerendererprops.md) | This type is a publicly exposed props of [EmbeddableRenderer](./kibana-plugin-plugins-embeddable-public.embeddablerenderer.md) Union is used to validate that or factory or embeddable is passed in, but it can't be both simultaneously In case when embeddable is passed in, input is optional, because there is already an input inside of embeddable object In case when factory is used, then input is required, because it will be used as initial input to create an embeddable object |
