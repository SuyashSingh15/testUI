"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialogComponent = void 0;
var _react = _interopRequireDefault(require("react"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _Dialog = _interopRequireDefault(require("@mui/material/Dialog"));
var _DialogActions = _interopRequireDefault(require("@mui/material/DialogActions"));
var _DialogContent = _interopRequireDefault(require("@mui/material/DialogContent"));
var _DialogContentText = _interopRequireDefault(require("@mui/material/DialogContentText"));
var _DialogTitle = _interopRequireDefault(require("@mui/material/DialogTitle"));
var _IconButton = _interopRequireDefault(require("@mui/material/IconButton"));
var _Close = _interopRequireDefault(require("@mui/icons-material/Close"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const DialogComponent = _ref => {
  let {
    open,
    onConfirm,
    title = "Confirm",
    onCancel,
    okText,
    cancelText,
    yesNo = false,
    hideButtons,
    children
  } = _ref;
  okText = okText ? okText : yesNo ? 'Yes' : 'Ok';
  cancelText = cancelText ? cancelText : yesNo ? 'No' : 'Cancel';
  return /*#__PURE__*/_react.default.createElement(_Dialog.default, {
    open: open,
    onClose: onCancel,
    "aria-labelledby": "alert-dialog-title",
    "aria-describedby": "alert-dialog-description"
  }, /*#__PURE__*/_react.default.createElement(_DialogTitle.default, {
    id: "alert-dialog-title",
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, title, hideButtons && /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    edge: "end",
    color: "inherit",
    onClick: onCancel,
    "aria-label": "close"
  }, /*#__PURE__*/_react.default.createElement(_Close.default, null))), /*#__PURE__*/_react.default.createElement(_DialogContent.default, null, /*#__PURE__*/_react.default.createElement(_DialogContentText.default, null, children)), !hideButtons && /*#__PURE__*/_react.default.createElement(_DialogActions.default, null, /*#__PURE__*/_react.default.createElement(_Button.default, {
    onClick: onCancel,
    className: "DeleteMenuItem"
  }, cancelText), /*#__PURE__*/_react.default.createElement(_Button.default, {
    onClick: onConfirm,
    autoFocus: true,
    className: "DeleteMenuItem_okText"
  }, okText)));
};
exports.DialogComponent = DialogComponent;