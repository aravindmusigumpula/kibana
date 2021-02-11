<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-public](./kibana-plugin-core-public.md) &gt; [HttpRequestInit](./kibana-plugin-core-public.httprequestinit.md) &gt; [referrer](./kibana-plugin-core-public.httprequestinit.referrer.md)

## HttpRequestInit.referrer property

The referrer of request. Its value can be a same-origin URL if explicitly set in init, the empty string to indicate no referrer, and "about:client" when defaulting to the global's default. This is used during fetching to determine the value of the `Referer` header of the request being made.

<b>Signature:</b>

```typescript
referrer?: string;
```