"use strict";

require("core-js/modules/es.array.push.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiModel = void 0;
require("core-js/modules/es.error.cause.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.match.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.string.replace-all.js");
require("core-js/modules/es.string.trim.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _index = _interopRequireDefault(require("./index"));
var _react = _interopRequireDefault(require("react"));
var yup = _interopRequireWildcard(require("yup"));
var _Paper = _interopRequireDefault(require("@mui/material/Paper"));
var _material = require("@mui/material");
var _Form = _interopRequireDefault(require("../Form/Form"));
const _excluded = ["match"],
  _excluded2 = ["match"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const nonAlphaNumeric = /[^a-zA-Z0-9]/g;
const customStyle = {};
const showRowsSelected = true;
const defaultValueConfigs = {
  "string": "",
  "boolean": false,
  "radio": false,
  "oneToMany": ""
};
class UiModel {
  constructor(modelConfig) {
    _defineProperty(this, "Form", _ref => {
      let {
          match
        } = _ref,
        props = _objectWithoutProperties(_ref, _excluded);
      return /*#__PURE__*/_react.default.createElement(_Form.default, _extends({
        model: this,
        Layout: this.Layout
      }, props));
    });
    _defineProperty(this, "Grid", _ref2 => {
      let {
          match
        } = _ref2,
        props = _objectWithoutProperties(_ref2, _excluded2);
      return /*#__PURE__*/_react.default.createElement(_Paper.default, null, /*#__PURE__*/_react.default.createElement(_index.default, _extends({
        model: this,
        showRowsSelected: showRowsSelected
      }, props)));
    });
    _defineProperty(this, "ChildGrid", props => {
      const {
        permissions
      } = this;
      const propsToBePassed = _objectSpread({}, props);
      if (permissions) propsToBePassed.permissions = permissions;
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_index.default, _extends({
        model: this
      }, propsToBePassed, {
        customStyle: customStyle,
        showRowsSelected: showRowsSelected
      })), /*#__PURE__*/_react.default.createElement(_material.Divider, {
        orientation: "horizontal",
        sx: {
          mt: 2
        }
      }));
    });
    const {
      title,
      controllerType,
      url
    } = modelConfig;
    let {
      api,
      idProperty = api + 'Id'
    } = modelConfig;
    if (!api) {
      api = "".concat(title.replaceAll(nonAlphaNumeric, '-').toLowerCase());
      idProperty = title.replaceAll(' ', '') + 'Id';
    }
    // api = controllerType === 'cs' ? `${api}.ashx` : `internal-reporting/api/${api}`;
    api = url;
    const defaultValues = _objectSpread({}, modelConfig.defaultValues);
    Object.assign(this, _objectSpread(_objectSpread({
      standard: true,
      idProperty
    }, modelConfig), {}, {
      api
    }));
    const columnVisibilityModel = {};
    for (const col of this.columns) {
      const name = col.field || col.id;
      if (col.hide === true) {
        columnVisibilityModel[col.id || col.field] = false;
      }
      defaultValues[name] = col.defaultValue === undefined ? defaultValueConfigs[col.type] || "" : col.defaultValue;
    }
    this.columnVisibilityModel = columnVisibilityModel;
    this.defaultValues = defaultValues;
  }
  getValidationSchema(_ref3) {
    let {
      id
    } = _ref3;
    const {
      columns
    } = this;
    let validationConfig = {};
    for (const column of columns) {
      const {
        field,
        label,
        header,
        type = 'string',
        requiredIfNew = false,
        required = false,
        min = '',
        max = '',
        validationLength = 0,
        multiSelect
      } = column;
      const formLabel = label || header;
      if (!formLabel) {
        continue;
      }
      let config;
      switch (type) {
        case 'string':
          config = yup.string().trim().label(formLabel);
          if (min) {
            config = config.min(Number(min), "".concat(formLabel, " must be at least ").concat(min, " characters long"));
          }
          if (max) {
            config = config.max(Number(max), "".concat(formLabel, " must be at most ").concat(max, " characters long"));
          }
          break;
        //Validation "oneToMany" type for grid to show snackbar - commenting out for use in future
        // case 'oneToMany':
        //     config = yup.string().label(formLabel).test(value => {
        //         const valueArray = (value && value.length > 0) ? value.split(',').map(item => item.trim()) : [];
        //         if (valueArray.length < 2) {
        //             snackbar.showError(`Please assign at least 2 ${formLabel}`, null, "error");
        //             return false;
        //         } else {
        //             return true;
        //         }
        //     });
        //     break;
        case 'boolean':
          config = yup.bool().nullable().transform((value, originalValue) => {
            if (originalValue === '') return null;
            return value;
          }).label(formLabel);
          break;
        case 'radio':
        case 'dayRadio':
          config = yup.mixed().label(formLabel).required("Select at least one option for ".concat(formLabel));
          break;
        case 'date':
          config = yup.date().nullable().transform((value, originalValue) => {
            if (originalValue === '' || originalValue === null) return null;
            return value;
          }).label(formLabel).required("".concat(formLabel, " is required"));
          break;
        case 'select':
          if (multiSelect) {
            config = yup.array().label(formLabel).required("Select at least one ".concat(formLabel));
          } else {
            config = yup.string().trim().label(formLabel).required("".concat(formLabel, " is required"));
          }
          break;
        case 'time':
          config = yup.string().trim().label(formLabel).required("".concat(formLabel, " is required"));
          break;
        case 'autocomplete':
          config = yup.string().trim().label(formLabel).required("Select at least one ".concat(formLabel));
          break;
        default:
          config = yup.mixed().label(formLabel);
          break;
      }
      if (!multiSelect && required) {
        config = config.required("".concat(formLabel, " is required"));
      }
      if (requiredIfNew && (!id || id === '')) {
        config = config.required("".concat(formLabel, " is required"));
      }
      validationConfig[field] = config;
    }
    let validationSchema = yup.object(_objectSpread(_objectSpread({}, validationConfig), this.validationSchema));
    return validationSchema;
  }
}
exports.UiModel = UiModel;