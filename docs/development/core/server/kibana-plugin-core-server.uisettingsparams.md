<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [UiSettingsParams](./kibana-plugin-core-server.uisettingsparams.md)

## UiSettingsParams interface

UiSettings parameters defined by the plugins.

<b>Signature:</b>

```typescript
export interface UiSettingsParams<T = unknown> 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [category](./kibana-plugin-core-server.uisettingsparams.category.md) | <code>string[]</code> | used to group the configured setting in the UI |
|  [deprecation](./kibana-plugin-core-server.uisettingsparams.deprecation.md) | <code>DeprecationSettings</code> | optional deprecation information. Used to generate a deprecation warning. |
|  [description](./kibana-plugin-core-server.uisettingsparams.description.md) | <code>string</code> | description provided to a user in UI |
|  [metric](./kibana-plugin-core-server.uisettingsparams.metric.md) | <code>{</code><br/><code>        type: UiCounterMetricType;</code><br/><code>        name: string;</code><br/><code>    }</code> | Metric to track once this property changes |
|  [name](./kibana-plugin-core-server.uisettingsparams.name.md) | <code>string</code> | title in the UI |
|  [optionLabels](./kibana-plugin-core-server.uisettingsparams.optionlabels.md) | <code>Record&lt;string, string&gt;</code> | text labels for 'select' type UI element |
|  [options](./kibana-plugin-core-server.uisettingsparams.options.md) | <code>string[]</code> | array of permitted values for this setting |
|  [readonly](./kibana-plugin-core-server.uisettingsparams.readonly.md) | <code>boolean</code> | a flag indicating that value cannot be changed |
|  [requiresPageReload](./kibana-plugin-core-server.uisettingsparams.requirespagereload.md) | <code>boolean</code> | a flag indicating whether new value applying requires page reloading |
|  [schema](./kibana-plugin-core-server.uisettingsparams.schema.md) | <code>Type&lt;T&gt;</code> |  |
|  [type](./kibana-plugin-core-server.uisettingsparams.type.md) | <code>UiSettingsType</code> | defines a type of UI element [UiSettingsType](./kibana-plugin-core-server.uisettingstype.md) |
|  [validation](./kibana-plugin-core-server.uisettingsparams.validation.md) | <code>ImageValidation &#124; StringValidation</code> |  |
|  [value](./kibana-plugin-core-server.uisettingsparams.value.md) | <code>T</code> | default value to fall back to if a user doesn't provide any |
