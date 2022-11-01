"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = void 0;
const handler = ({
  field
}) => {
  field.data = Object.assign(Object.assign({}, field.data), {
    focused: true
  });
};
exports.handler = handler;