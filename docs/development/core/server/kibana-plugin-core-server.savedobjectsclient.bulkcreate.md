<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [SavedObjectsClient](./kibana-plugin-core-server.savedobjectsclient.md) &gt; [bulkCreate](./kibana-plugin-core-server.savedobjectsclient.bulkcreate.md)

## SavedObjectsClient.bulkCreate() method

Persists multiple documents batched together as a single request

<b>Signature:</b>

```typescript
bulkCreate<T = unknown>(objects: Array<SavedObjectsBulkCreateObject<T>>, options?: SavedObjectsCreateOptions): Promise<SavedObjectsBulkResponse<T>>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  objects | <code>Array&lt;SavedObjectsBulkCreateObject&lt;T&gt;&gt;</code> |  |
|  options | <code>SavedObjectsCreateOptions</code> |  |

<b>Returns:</b>

`Promise<SavedObjectsBulkResponse<T>>`
