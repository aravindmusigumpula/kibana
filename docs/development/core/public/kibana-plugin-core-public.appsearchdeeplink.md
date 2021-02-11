<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-public](./kibana-plugin-core-public.md) &gt; [AppSearchDeepLink](./kibana-plugin-core-public.appsearchdeeplink.md)

## AppSearchDeepLink type

Input type for registering secondary in-app locations for an application.

Deep links must include at least one of `path` or `searchDeepLinks`<!-- -->. A deep link that does not have a `path` represents a topological level in the application's hierarchy, but does not have a destination URL that is user-accessible.

<b>Signature:</b>

```typescript
export declare type AppSearchDeepLink = {
    id: string;
    title: string;
} & ({
    path: string;
    searchDeepLinks?: AppSearchDeepLink[];
} | {
    path?: string;
    searchDeepLinks: AppSearchDeepLink[];
});
```