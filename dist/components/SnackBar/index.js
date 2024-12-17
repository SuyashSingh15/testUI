"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSnackbar = exports.SnackbarProvider = exports.SnackbarContext = void 0;
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _Snackbar = _interopRequireDefault(require("@mui/material/Snackbar"));
var _Alert = _interopRequireDefault(require("@mui/material/Alert"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const SnackbarContext = exports.SnackbarContext = /*#__PURE__*/(0, _react.createContext)(null);
const Alert = /*#__PURE__*/_react.default.forwardRef(function Alert(props, ref) {
  return /*#__PURE__*/_react.default.createElement(_Alert.default, _extends({
    elevation: 6,
    ref: ref,
    variant: "filled"
  }, props));
});
const SnackbarProvider = _ref => {
  let {
    children
  } = _ref;
  const [message, setMessage] = (0, _react.useState)(null);
  const [open, setOpen] = (0, _react.useState)(false);
  const [severity, setSeverity] = (0, _react.useState)(null);
  const [handleAction, setHandleAction] = (0, _react.useState)(null);
  const showMessage = function showMessage(title, message) {
    let severity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "info";
    let onAction = arguments.length > 3 ? arguments[3] : undefined;
    if (typeof title !== 'string') {
      title = title.toString();
    }
    if (message && typeof message !== 'string') {
      message = message.toString();
    }
    setMessage(message ? "".concat(title, ": ").concat(message) : title);
    setSeverity(severity);
    setOpen(true);
    setHandleAction(onAction);
  };
  const showError = function showError(title, message) {
    let severity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "error";
    let onAction = arguments.length > 3 ? arguments[3] : undefined;
    showMessage(title, message, severity, onAction);
  };
  const handleClose = function handleClose() {
    setOpen(false);
    setHandleAction(null);
    if (handleAction) {
      handleAction();
    }
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(SnackbarContext.Provider, {
    value: {
      showMessage,
      showError
    }
  }, children), /*#__PURE__*/_react.default.createElement(_Snackbar.default, {
    open: open,
    autoHideDuration: 6000,
    onClose: handleClose
  }, /*#__PURE__*/_react.default.createElement(Alert, {
    severity: severity
  }, message)));
};
exports.SnackbarProvider = SnackbarProvider;
const useSnackbar = exports.useSnackbar = function useSnackbar() {
  return (0, _react.useContext)(SnackbarContext);
};