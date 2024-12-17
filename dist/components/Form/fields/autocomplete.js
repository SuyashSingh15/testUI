"use strict";

require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/web.dom-collections.iterator.js");
var React = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _FormControl = _interopRequireDefault(require("@mui/material/FormControl"));
var _Autocomplete = _interopRequireDefault(require("@mui/material/Autocomplete"));
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const Field = _ref => {
  var _formik$values$field;
  let {
    column,
    field,
    fieldLabel,
    formik,
    combos,
    data,
    otherProps,
    model,
    fieldConfigs
  } = _ref;
  const SurveyType = combos === null || combos === void 0 ? void 0 : combos[model === null || model === void 0 ? void 0 : model.comboType];
  let inputValue = ((_formik$values$field = formik.values[field]) === null || _formik$values$field === void 0 || (_formik$values$field = _formik$values$field.split(", ")) === null || _formik$values$field === void 0 ? void 0 : _formik$values$field.map(Number)) || [];
  let filteredCombos = (SurveyType === null || SurveyType === void 0 ? void 0 : SurveyType.filter(combo => inputValue.includes(combo.LookupId))) || [];
  const isDisabled = fieldConfigs === null || fieldConfigs === void 0 ? void 0 : fieldConfigs.disabled;
  const handleAutoCompleteChange = (event, newValue) => {
    formik === null || formik === void 0 || formik.setFieldValue(field, newValue ? newValue.map(val => val.LookupId).join(', ') : '');
  };
  return /*#__PURE__*/React.createElement(_FormControl.default, {
    fullWidth: true,
    key: field,
    variant: "standard",
    error: formik.touched[field] && Boolean(formik.errors[field])
  }, /*#__PURE__*/React.createElement(_Autocomplete.default, _extends({}, otherProps, {
    multiple: true,
    id: field,
    options: SurveyType || [],
    getOptionLabel: option => option.DisplayValue || '',
    defaultValue: filteredCombos,
    renderInput: params => /*#__PURE__*/React.createElement(_TextField.default, _extends({}, params, {
      variant: "standard"
    })),
    onChange: handleAutoCompleteChange,
    value: filteredCombos,
    size: "small",
    disabled: isDisabled
  })), formik.touched[field] && formik.errors[field] && /*#__PURE__*/React.createElement(_material.FormHelperText, null, formik.errors[field]));
};
var _default = exports.default = Field;