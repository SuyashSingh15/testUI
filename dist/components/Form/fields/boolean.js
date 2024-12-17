"use strict";

require("core-js/modules/es.object.assign.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _FormControlLabel = _interopRequireDefault(require("@mui/material/FormControlLabel"));
var _material = require("@mui/material");
var _Checkbox = _interopRequireDefault(require("@mui/material/Checkbox"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const field = _ref => {
  let {
    column,
    field,
    fieldLabel,
    formik,
    otherProps,
    classes,
    onChange
  } = _ref;
  const handleChange = event => {
    formik.setFieldValue(field, event.target.checked);
  };
  const isChecked = formik.values[field] === true || formik.values[field] === 1;
  return /*#__PURE__*/_react.default.createElement("div", {
    key: field
  }, /*#__PURE__*/_react.default.createElement(_FormControlLabel.default, {
    control: /*#__PURE__*/_react.default.createElement(_Checkbox.default, _extends({}, otherProps, {
      name: field,
      readOnly: column.readOnly === true,
      checked: isChecked,
      onChange: handleChange,
      onBlur: formik.handleBlur
    })),
    label: fieldLabel || column.label
  }), /*#__PURE__*/_react.default.createElement(_material.FormHelperText, null, formik.touched[field] && formik.errors[field]));
};
var _default = exports.default = field;