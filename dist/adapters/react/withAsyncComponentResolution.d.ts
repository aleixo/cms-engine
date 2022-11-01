/// <reference types="react" />
declare const withAsyncComponentResolution: <T>(Comp: any) => (props: T & {
    async: boolean;
    wrapper: any;
}) => JSX.Element;
export { withAsyncComponentResolution };
