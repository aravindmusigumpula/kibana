<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-plugins-data-public](./kibana-plugin-plugins-data-public.md) &gt; [SessionState](./kibana-plugin-plugins-data-public.sessionstate.md)

## SessionState enum

Possible state that current session can be in

<b>Signature:</b>

```typescript
export declare enum SessionState 
```

## Enumeration Members

|  Member | Value | Description |
|  --- | --- | --- |
|  BackgroundCompleted | <code>&quot;backgroundCompleted&quot;</code> | Page load completed with background session created. |
|  BackgroundLoading | <code>&quot;backgroundLoading&quot;</code> | Search request was sent to the background. The page is loading in background. |
|  Canceled | <code>&quot;canceled&quot;</code> | Current session requests where explicitly canceled by user Displaying none or partial results |
|  Completed | <code>&quot;completed&quot;</code> | No action was taken and the page completed loading without background session creation. |
|  Loading | <code>&quot;loading&quot;</code> | Pending search request has not been sent to the background yet |
|  None | <code>&quot;none&quot;</code> | Session is not active, e.g. didn't start |
|  Restored | <code>&quot;restored&quot;</code> | Revisiting the page after background completion |
