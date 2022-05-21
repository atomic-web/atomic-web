import '@atomic-web/ui-core';
/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svg' {
  const content: any;
  export const ReactComponent: any;
  export default content;
}


declare module '@atomic-web/ui-core'{
     interface SessionInfo {
       userName : string;
     }
}