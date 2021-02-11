<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [SavedObjectsImportOptions](./kibana-plugin-core-server.savedobjectsimportoptions.md)

## SavedObjectsImportOptions interface

Options to control the import operation.

<b>Signature:</b>

```typescript
export interface SavedObjectsImportOptions 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [createNewCopies](./kibana-plugin-core-server.savedobjectsimportoptions.createnewcopies.md) | <code>boolean</code> | If true, will create new copies of import objects, each with a random <code>id</code> and undefined <code>originId</code>. |
|  [namespace](./kibana-plugin-core-server.savedobjectsimportoptions.namespace.md) | <code>string</code> | if specified, will import in given namespace, else will import as global object |
|  [objectLimit](./kibana-plugin-core-server.savedobjectsimportoptions.objectlimit.md) | <code>number</code> | The maximum number of object to import |
|  [overwrite](./kibana-plugin-core-server.savedobjectsimportoptions.overwrite.md) | <code>boolean</code> | If true, will override existing object if present. Note: this has no effect when used with the <code>createNewCopies</code> option. |
|  [readStream](./kibana-plugin-core-server.savedobjectsimportoptions.readstream.md) | <code>Readable</code> | The stream of [saved objects](./kibana-plugin-core-server.savedobject.md) to import |
|  [savedObjectsClient](./kibana-plugin-core-server.savedobjectsimportoptions.savedobjectsclient.md) | <code>SavedObjectsClientContract</code> | [client](./kibana-plugin-core-server.savedobjectsclientcontract.md) to use to perform the import operation |
|  [typeRegistry](./kibana-plugin-core-server.savedobjectsimportoptions.typeregistry.md) | <code>ISavedObjectTypeRegistry</code> | The registry of all known saved object types |
