<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-public](./kibana-plugin-core-public.md) &gt; [AppCategory](./kibana-plugin-core-public.appcategory.md)

## AppCategory interface

A category definition for nav links to know where to sort them in the left hand nav

<b>Signature:</b>

```typescript
export interface AppCategory 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [ariaLabel](./kibana-plugin-core-public.appcategory.arialabel.md) | <code>string</code> | If the visual label isn't appropriate for screen readers, can override it here |
|  [euiIconType](./kibana-plugin-core-public.appcategory.euiicontype.md) | <code>string</code> | Define an icon to be used for the category If the category is only 1 item, and no icon is defined, will default to the product icon Defaults to initials if no icon is defined |
|  [id](./kibana-plugin-core-public.appcategory.id.md) | <code>string</code> | Unique identifier for the categories |
|  [label](./kibana-plugin-core-public.appcategory.label.md) | <code>string</code> | Label used for category name. Also used as aria-label if one isn't set. |
|  [order](./kibana-plugin-core-public.appcategory.order.md) | <code>number</code> | The order that categories will be sorted in Prefer large steps between categories to allow for further editing (Default categories are in steps of 1000) |
