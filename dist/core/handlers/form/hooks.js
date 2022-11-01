"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = void 0;
const handler = ({
  form
}) => {
  return {
    setScope: data => form.scope.globalScope = data
  };
};
exports.handler = handler;