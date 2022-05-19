import '@atomic-web/UI';
/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svg' {
  const content: any;
  export const ReactComponent: any;
  export default content;
}


declare module '@atomic-web/UI'{
     interface SessionInfo {
       userName : string;
     }
}