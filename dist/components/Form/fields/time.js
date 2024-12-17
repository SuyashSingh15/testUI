"use strict";

require("core-js/modules/es.error.cause.js");
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.json.stringify.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
var _Radio = _interopRequireDefault(require("@mui/material/Radio"));
var _RadioGroup = _interopRequireDefault(require("@mui/material/RadioGroup"));
var _FormControlLabel = _interopRequireDefault(require("@mui/material/FormControlLabel"));
var _FormControl = _interopRequireDefault(require("@mui/material/FormControl"));
var _TimePicker = require("@mui/x-date-pickers/TimePicker");
var _AdapterDayjs = require("@mui/x-date-pickers/AdapterDayjs");
var _LocalizationProvider = require("@mui/x-date-pickers/LocalizationProvider");
var _dayjs = _interopRequireDefault(require("dayjs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const Field = _ref => {
  var _column$dependentFiel2;
  let {
    column,
    field,
    fieldLabel,
    formik,
    otherProps,
    classes,
    onChange
  } = _ref;
  const [timePeriod, setTimePeriod] = (0, _react.useState)("AM");
  const [time, setTime] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    var _column$dependentFiel;
    let dateTime;
    const hasDependentField = (column === null || column === void 0 || (_column$dependentFiel = column.dependentField) === null || _column$dependentFiel === void 0 ? void 0 : _column$dependentFiel.operator) === ">=";
    if (formik.values[field]) {
      if (hasDependentField && (0, _dayjs.default)(formik.values[field]).diff((0, _dayjs.default)(formik.values[column.dependentField.field]).add(5, 'minute'), "m") <= 0) {
        const dependentFieldTime = (0, _dayjs.default)(formik.values[column.dependentField.field]).add(5, 'minute');
        if (dependentFieldTime.get("hour") > 12) {
          setTimePeriod("PM");
        } else {
          setTimePeriod("AM");
        }
        setTime(dependentFieldTime);
        formik.setFieldValue(field, dependentFieldTime.toISOString());
      } else {
        if (column.isUtc) {
          dateTime = _dayjs.default.utc(formik.values[field]).utcOffset((0, _dayjs.default)().utcOffset(), true).format();
        } else {
          dateTime = (0, _dayjs.default)(formik.values[field]);
        }
        setTime(dateTime);
        setTimePeriod(dateTime.format("A"));
      }
    } else {
      if (hasDependentField && formik.values[column.dependentField.field]) {
        const dependentFieldTime = (0, _dayjs.default)(formik.values[column.dependentField.field]).add(5, 'minute');
        if (dependentFieldTime.get("hour") > 12) {
          setTimePeriod("PM");
        } else {
          setTimePeriod("AM");
        }
        setTime(dependentFieldTime);
        formik.setFieldValue(field, dependentFieldTime.toISOString());
      } else {
        setTime(null);
      }
    }
  }, [JSON.stringify(formik.values), timePeriod]);
  const handleRadioChange = event => {
    setTimePeriod(event.target.value);
    updateFormikTime(time, event.target.value);
  };
  const handleTimeChange = newTime => {
    if (column.showExternalControls) {
      setTime(newTime);
      setTimePeriod((0, _dayjs.default)(newTime).format("A"));
      updateFormikTime(newTime, (0, _dayjs.default)(newTime).format("A"));
      return;
    } else if (column.isUtc) {
      var _newTime;
      newTime = (_newTime = newTime) !== null && _newTime !== void 0 && _newTime.isValid() ? newTime.format("YYYY-MM-DDTHH:mm:ss") + ".000Z" : null;
    }
    return formik.setFieldValue(field, newTime);
  };
  const updateFormikTime = (timeValue, period) => {
    if (!timeValue) return;
    let hours = timeValue.hour();
    const minutes = timeValue.minute();
    if (period === "PM" && hours < 12) hours += 12;
    if (period === "AM" && hours >= 12) hours -= 12;
    const dateTime = (0, _dayjs.default)().hour(hours).minute(minutes);
    formik.setFieldValue(field, dateTime.toISOString());
  };
  fieldLabel = fieldLabel || column.label;
  fieldLabel += column.required ? " *" : "";
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: '1rem'
    }
  }, /*#__PURE__*/_react.default.createElement(_LocalizationProvider.LocalizationProvider, {
    dateAdapter: _AdapterDayjs.AdapterDayjs
  }, /*#__PURE__*/_react.default.createElement(_TimePicker.TimePicker, _extends({}, otherProps, {
    label: fieldLabel,
    variant: "standard",
    readOnly: (column === null || column === void 0 ? void 0 : column.readOnly) === true,
    key: field,
    fullWidth: true,
    disabled: column.dependentField && formik.values[column.dependentField.field] === "",
    name: field,
    value: time,
    minTime: (column === null || column === void 0 || (_column$dependentFiel2 = column.dependentField) === null || _column$dependentFiel2 === void 0 ? void 0 : _column$dependentFiel2.operator) === ">=" && formik.values[column.dependentField.field] !== "" ? (0, _dayjs.default)(formik.values[column.dependentField.field]).add(4, 'minute') : null,
    slotProps: {
      textField: {
        helperText: formik.touched[field] && formik.errors[field],
        error: formik.touched[field] && formik.errors[field],
        variant: "filled",
        placeholder: "hh:mm"
      }
    },
    closeOnSelect: column.closeOnSelect,
    format: "hh:mm",
    views: ["hours", "minutes"],
    onChange: handleTimeChange,
    onBlur: formik.handleBlur,
    helperText: formik.touched[field] && formik.errors[field],
    renderInput: params => {
      const props = _objectSpread(_objectSpread({}, params), {}, {
        variant: "standard"
      });
      return /*#__PURE__*/_react.default.createElement(_TextField.default, _extends({}, props, {
        helperText: formik.errors[field],
        fullWidth: true
      }));
    }
  })), column.showExternalControls && /*#__PURE__*/_react.default.createElement(_FormControl.default, {
    component: "fieldset"
  }, /*#__PURE__*/_react.default.createElement(_RadioGroup.default, {
    value: timePeriod,
    onChange: handleRadioChange,
    style: {
      flexDirection: "row",
      flexWrap: "nowrap"
    }
  }, /*#__PURE__*/_react.default.createElement(_FormControlLabel.default, {
    value: "AM",
    control: /*#__PURE__*/_react.default.createElement(_Radio.default, {
      checked: timePeriod === "AM"
    }),
    label: "AM"
  }), /*#__PURE__*/_react.default.createElement(_FormControlLabel.default, {
    value: "PM",
    control: /*#__PURE__*/_react.default.createElement(_Radio.default, {
      checked: timePeriod === "PM"
    }),
    label: "PM"
  })))));
};
var _default = exports.default = Field;