"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = void 0;
const handler = ({
  field,
  data
}) => {
  field.data.changed = true;
  field.data.metadata = data.metadata;
  field.value = data.parsedEventValue;
};
exports.handler = handler;