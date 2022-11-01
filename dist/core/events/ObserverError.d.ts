declare class ObserverError extends Error {
    breaksObservingChain: boolean;
    constructor(message: any, { breaksObservingChain }: {
        breaksObservingChain: any;
    });
}
export { ObserverError };
