class ObserverError extends Error {
  breaksObservingChain = false;

  constructor(message, { breaksObservingChain }) {
    super();
    this.message = message;
    this.breaksObservingChain = breaksObservingChain;
  }
}

export { ObserverError };
