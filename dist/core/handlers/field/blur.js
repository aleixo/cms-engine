"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = void 0;
const handler = ({
  field
}) => {
  field.data.blured = true;
};
exports.handler = handler;