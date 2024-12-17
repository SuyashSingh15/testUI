"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _material = require("@mui/material");
const _excluded = ["field", "formik", "orientation", "label", "lookups", "fieldConfigs", "mode", "column"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } } return target; }
const Field = _ref => {
  let {
      field,
      formik,
      orientation = "row",
      label,
      lookups,
      fieldConfigs,
      mode,
      column
    } = _ref,
    otherProps = _objectWithoutProperties(_ref, _excluded);
  const handleChange = event => {
    formik.setFieldValue(field, event.target.value);
  };
  const options = lookups ? lookups[column.lookup] : [];
  let inputValue = String(formik.values[field]) || Number(formik.values[field]);
  const theme = (0, _material.useTheme)();
  const isError = formik.touched[field] && Boolean(formik.errors[field]);
  let isDisabled;
  if (mode !== 'copy') {
    isDisabled = fieldConfigs === null || fieldConfigs === void 0 ? void 0 : fieldConfigs.disabled;
  }
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.FormControl, {
    component: "fieldset",
    error: isError
  }, /*#__PURE__*/_react.default.createElement(_material.FormLabel, {
    component: "legend"
  }, label), /*#__PURE__*/_react.default.createElement(_material.RadioGroup, {
    row: orientation === "row",
    "aria-label": label,
    name: field,
    value: inputValue,
    onChange: handleChange
  }, options === null || options === void 0 ? void 0 : options.map((option, index) => /*#__PURE__*/_react.default.createElement(_material.FormControlLabel, {
    key: index,
    value: option.value,
    control: /*#__PURE__*/_react.default.createElement(_material.Radio, null),
    label: option.label,
    disabled: isDisabled
  })))), isError && /*#__PURE__*/_react.default.createElement(_material.FormHelperText, {
    style: {
      color: theme.palette.error.main
    }
  }, formik.errors[field]));
};
var _default = exports.default = Field;