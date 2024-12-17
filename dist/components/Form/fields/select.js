"use strict";

require("core-js/modules/es.object.assign.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.parse-int.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _material = require("@mui/material");
var _KeyboardArrowDown = _interopRequireDefault(require("@mui/icons-material/KeyboardArrowDown"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const Field = _ref => {
  var _column$dependentFiel, _column$dependentFiel2;
  let {
    column,
    field,
    fieldLabel,
    formik,
    activeRecord,
    otherProps,
    classes,
    onChange,
    lookups
  } = _ref;
  let options = lookups ? lookups[column === null || column === void 0 ? void 0 : column.lookup] : [];
  if (((_column$dependentFiel = column.dependentField) === null || _column$dependentFiel === void 0 ? void 0 : _column$dependentFiel.operator) === "equals" && formik.values[column.dependentField.field] !== "") {
    const selectedHospitalId = formik.values[column.dependentField.field];
    options = options.filter(option => option[column.dependentField.lookupFieldToBeComparedWith] === selectedHospitalId);
  }
  let inputValue;
  if (column.valueParserForForm) {
    inputValue = column.valueParserForForm(formik.values[field]);
  } else {
    inputValue = String(formik.values[field]);
  }
  if (column.multiSelect) {
    if (!inputValue || inputValue.length === 0) {
      inputValue = [];
    } else if (!Array.isArray(inputValue)) {
      inputValue = inputValue.split(",").map(e => parseInt(e));
    }
  }
  fieldLabel = fieldLabel || column.label;
  fieldLabel += column.required ? " *" : "";
  return /*#__PURE__*/_react.default.createElement(_material.FormControl, {
    fullWidth: true,
    key: field,
    variant: "standard"
  }, /*#__PURE__*/_react.default.createElement(_material.InputLabel, {
    error: formik.touched[field] && formik.errors[field]
  }, fieldLabel), /*#__PURE__*/_react.default.createElement(_material.Select, _extends({
    IconComponent: _KeyboardArrowDown.default
  }, otherProps, {
    error: formik.touched[field] && formik.errors[field],
    name: field,
    disabled: ((_column$dependentFiel2 = column.dependentField) === null || _column$dependentFiel2 === void 0 ? void 0 : _column$dependentFiel2.field) && !formik.values[column.dependentField.field] || !options.length,
    multiple: column.multiSelect === true,
    readOnly: column.readOnly === true,
    value: inputValue,
    renderValue: selected => {
      if (Array.isArray(selected)) {
        return selected.map(value => {
          const option = options.find(option => option.value === value);
          return option ? option.label : "Select";
        }).join(", ");
      } else {
        const selectedOption = options.find(option => option.value === parseInt(selected));
        return selectedOption ? selectedOption.label : "Select";
      }
    },
    onChange: formik.handleChange,
    onBlur: formik.handleBlur
  }), Array.isArray(options) && options.map(option => /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    key: option.value,
    value: option.value
  }, option.label))), formik.touched[field] && formik.errors[field] && /*#__PURE__*/_react.default.createElement(_material.FormHelperText, {
    error: true
  }, formik.errors[field]));
};
var _default = exports.default = Field;