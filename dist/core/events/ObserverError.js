"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObserverError = void 0;
class ObserverError extends Error {
  constructor(message, {
    breaksObservingChain
  }) {
    super();
    this.breaksObservingChain = false;
    this.message = message;
    this.breaksObservingChain = breaksObservingChain;
  }
}
exports.ObserverError = ObserverError;