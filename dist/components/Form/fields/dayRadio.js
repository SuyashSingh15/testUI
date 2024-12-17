"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CustomAvator = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _colors = require("@mui/material/colors");
const _excluded = ["name", "field", "formik", "expired"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } } return target; }
const days = [{
  label: 'Sunday',
  value: 0,
  display: 'S'
}, {
  label: 'Monday',
  value: 1,
  display: 'M'
}, {
  label: 'Tuesday',
  value: 2,
  display: 'T'
}, {
  label: 'Wednesday',
  value: 3,
  display: 'W'
}, {
  label: 'Thursday',
  value: 4,
  display: 'T'
}, {
  label: 'Friday',
  value: 5,
  display: 'F'
}, {
  label: 'Saturday',
  value: 6,
  display: 'S'
}];
const CustomAvator = exports.CustomAvator = (0, _material.styled)(_material.Avatar)(_ref => {
  let {
    backgroundColor
  } = _ref;
  return {
    width: 34,
    height: 34,
    padding: 1,
    margin: 1,
    backgroundColor: backgroundColor
  };
});
const DayAvatar = _ref2 => {
  let {
    day,
    onClick: _onClick,
    backgroundColor
  } = _ref2;
  return /*#__PURE__*/_react.default.createElement(CustomAvator, {
    key: day.value,
    onClick: () => _onClick(day.value),
    backgroundColor: backgroundColor,
    style: {
      margin: '4px'
    }
  }, day.display);
};
const DaySelection = _ref3 => {
  let {
      name,
      field,
      formik,
      expired
    } = _ref3,
    props = _objectWithoutProperties(_ref3, _excluded);
  const {
    setFieldValue
  } = formik;
  const {
    value
  } = formik.getFieldProps(name || field);
  const isWeekend = '1000001';
  const isWeekdays = '0111110';
  const defaultVal = "0".repeat(7);
  const [selectedDays, setSelectedDays] = (0, _react.useState)(value || defaultVal);
  const [radioValue, setRadioValue] = (0, _react.useState)(() => {
    if (!value) return '';
    if (value === isWeekend) return isWeekend;
    if (value === isWeekdays) return isWeekdays;
    return 'Custom';
  });
  const [presetSelected, setPresetSelected] = (0, _react.useState)(false);
  const onAssignChange = (0, _react.useCallback)(newValue => {
    if (Array.isArray(newValue)) {
      let finalValue = defaultVal;
      for (const val of newValue) {
        finalValue = finalValue.substring(0, val) + "1" + finalValue.substring(val + 1);
      }
      setSelectedDays(finalValue);
      setFieldValue(name || field, finalValue);
      setPresetSelected(true);
    } else {
      let baseValue = presetSelected ? defaultVal : selectedDays;
      const finalValue = baseValue.slice(0, newValue) + (baseValue[newValue] === "1" ? "0" : "1") + baseValue.slice(newValue + 1);
      setSelectedDays(finalValue);
      setFieldValue(name || field, finalValue);
      setRadioValue('Custom');
      setPresetSelected(false);
    }
  }, [presetSelected, defaultVal, selectedDays, name, field, setFieldValue]);
  const theme = (0, _material.useTheme)();
  const isError = formik.touched[field] && Boolean(formik.errors[field]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.FormControl, {
    component: "fieldset",
    error: isError
  }, /*#__PURE__*/_react.default.createElement(_material.RadioGroup, {
    row: true,
    name: name || field,
    value: radioValue,
    onChange: event => {
      const val = event.target.value;
      setRadioValue(val);
      if (val !== 'Custom') {
        setSelectedDays(val);
        setFieldValue(name || field, val);
        setPresetSelected(true);
      } else {
        setSelectedDays(defaultVal);
        setFieldValue(name || field, defaultVal);
        setPresetSelected(false);
      }
    }
  }, /*#__PURE__*/_react.default.createElement(_material.FormControlLabel, {
    value: isWeekend,
    control: /*#__PURE__*/_react.default.createElement(_material.Radio, null),
    label: "Weekends (Sat - Sun)",
    onClick: () => onAssignChange([0, 6])
  }), /*#__PURE__*/_react.default.createElement(_material.FormControlLabel, {
    value: isWeekdays,
    control: /*#__PURE__*/_react.default.createElement(_material.Radio, null),
    label: "Weekdays (Mon - Fri)",
    onClick: () => onAssignChange([1, 2, 3, 4, 5])
  }), /*#__PURE__*/_react.default.createElement(_material.FormControlLabel, {
    value: 'Custom',
    control: /*#__PURE__*/_react.default.createElement(_material.Radio, null),
    label: "Days of the week"
  }), days.map((day, index) => /*#__PURE__*/_react.default.createElement(DayAvatar, {
    key: day.value,
    day: day,
    selectedItems: selectedDays,
    onClick: () => onAssignChange(index),
    backgroundColor: radioValue === 'Custom' && selectedDays[index] === "1" ? _colors.deepOrange[300] : _colors.grey[500],
    disabled: expired
  })))), isError && /*#__PURE__*/_react.default.createElement(_material.FormHelperText, {
    style: {
      color: theme.palette.error.main
    }
  }, formik.errors[field]));
};
var _default = exports.default = DaySelection;