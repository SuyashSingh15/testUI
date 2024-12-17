"use strict";

require("core-js/modules/es.error.cause.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ActiveStepContext = void 0;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.object.from-entries.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.promise.finally.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.map.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _formik = require("formik");
var _crudHelper = require("../Grid/crud-helper");
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _Paper = _interopRequireDefault(require("@mui/material/Paper"));
var _material = require("@mui/material");
var _CircularProgress = _interopRequireDefault(require("@mui/material/CircularProgress"));
var _Stack = _interopRequireDefault(require("@mui/material/Stack"));
var _fieldMapper = _interopRequireDefault(require("./field-mapper"));
var _SnackBar = require("../SnackBar");
var _Dialog = require("../Dialog");
var _useRouter = require("../useRouter/useRouter");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const ActiveStepContext = exports.ActiveStepContext = /*#__PURE__*/(0, _react.createContext)(1);
const Form = _ref => {
  let {
    model,
    api,
    permissions = {
      edit: true,
      export: true,
      delete: true
    },
    Layout = _fieldMapper.default,
    ids,
    closeDialog,
    fetchData,
    signOut,
    resetChildGrid //boolean
  } = _ref;
  const {
    navigate,
    getParams
  } = (0, _useRouter.useRouter)();
  const defaultFieldConfigs = {};
  const {
    id: idFromQuery
  } = getParams;
  const idWithOptions = idFromQuery || ids;
  const id = idWithOptions === null || idWithOptions === void 0 ? void 0 : idWithOptions.split('-')[0];
  const [isLoading, setIsLoading] = (0, _react.useState)(true);
  const [data, setData] = (0, _react.useState)(null);
  const [lookups, setLookups] = (0, _react.useState)(null);
  const [isDeleting, setIsDeleting] = (0, _react.useState)(false);
  const snackbar = (0, _SnackBar.useSnackbar)();
  const combos = {};
  const [validationSchema, setValidationSchema] = (0, _react.useState)(null);
  const [activeStep, setActiveStep] = (0, _react.useState)(0);
  const [isDiscardDialogOpen, setIsDiscardDialogOpen] = (0, _react.useState)(false);
  const [errorMessage, setErrorMessage] = (0, _react.useState)('');
  const fieldConfigs = model !== null && model !== void 0 && model.applyFieldConfig ? model === null || model === void 0 ? void 0 : model.applyFieldConfig({
    data,
    lookups
  }) : defaultFieldConfigs;
  const getInitialData = () => {
    setValidationSchema(model.getValidationSchema({
      id,
      snackbar
    }));
    const options = idWithOptions === null || idWithOptions === void 0 ? void 0 : idWithOptions.split('-');
    try {
      (0, _crudHelper.getRecord)({
        id: options.length > 1 ? options[1] : options[0],
        modelConfig: model,
        setIsLoading,
        setError: errorOnLoad,
        setActiveRecord
      });
    } catch (error) {
      snackbar === null || snackbar === void 0 || snackbar.showMessage('An error occured, please try after some time.');
    }
  };
  (0, _react.useEffect)(getInitialData, [id, idWithOptions, model]);
  const formik = (0, _formik.useFormik)({
    enableReinitialize: true,
    initialValues: _objectSpread(_objectSpread({}, model.initialValues), data),
    validationSchema: validationSchema,
    validateOnBlur: true,
    onSubmit: (values, _ref2) => {
      let {
        resetForm
      } = _ref2;
      setIsLoading(true);
      const columns = model.columns.filter(item => item.isNotPayload).map(item => item.field);
      values = Object.fromEntries(Object.entries(values).filter(_ref3 => {
        let [key] = _ref3;
        return !columns.includes(key);
      }));
      (0, _crudHelper.saveRecord)({
        id,
        api: api || (model === null || model === void 0 ? void 0 : model.api),
        values,
        setIsLoading,
        setError: snackbar === null || snackbar === void 0 ? void 0 : snackbar.showError
      }).then(success => {
        if (success) {
          closeDialog === null || closeDialog === void 0 || closeDialog();
          if (model.addHeaderFilters === false) {
            console.log(success);
            if (signOut && success.reAuth) {
              return signOut();
            }
            fetchData && fetchData();
          }
          if (_crudHelper.getList && !fetchData) {
            (0, _crudHelper.getList)();
          }
          snackbar === null || snackbar === void 0 || snackbar.showMessage('Record Updated Successfully.');
        }
      }).finally(() => setIsLoading(false));
    }
  });
  const errorOnLoad = function errorOnLoad(title, error) {
    snackbar === null || snackbar === void 0 || snackbar.showError(title, error);
    // navigate('./');
  };
  const {
    dirty
  } = formik;
  const handleDiscardChanges = () => {
    if (resetChildGrid) {
      getInitialData();
    } else {
      formik.resetForm();
      setIsDiscardDialogOpen(false);
    }
  };
  const handleDiscardChangesCloseDialog = () => {
    formik.resetForm();
    setIsDiscardDialogOpen(false);
    navigate('.');
  };
  const warnUnsavedChanges = () => {
    if (dirty) {
      setIsDiscardDialogOpen(true);
    }
  };
  const setActiveRecord = function setActiveRecord(_ref4) {
    let {
      id,
      title,
      record,
      lookups
    } = _ref4;
    const isCopy = idWithOptions.indexOf("-") > -1;
    const isNew = !id || id === "0";
    const localTitle = isNew ? "Create" : isCopy ? "Copy" : "Edit";
    const localValue = isNew ? "" : record[model.linkColumn];
    const breadcrumbs = [{
      text: model === null || model === void 0 ? void 0 : model.title
    }, {
      text: localTitle
    }];
    if (isCopy) {
      record[model.linkColumn] += " (Copy)";
    }
    setData(record);
    setLookups(lookups);
    if (localValue !== "") {
      breadcrumbs.push({
        text: localValue
      });
    }
  };
  const handleFormCancel = function handleFormCancel(e) {
    e === null || e === void 0 || e.preventDefault();
    if (model.path) {
      navigate("./".concat(model.path));
    } else {
      navigate('./');
    }
  };
  const handleDelete = async function handleDelete() {
    setIsDeleting(true);
    try {
      const response = await (0, _crudHelper.deleteRecord)({
        id,
        api: api || (model === null || model === void 0 ? void 0 : model.api),
        setIsLoading,
        setError: snackbar === null || snackbar === void 0 ? void 0 : snackbar.showError
      });
      if (response) {
        snackbar === null || snackbar === void 0 || snackbar.showMessage('Record Deleted Successfully.');
        // navigate('./');
      }
    } catch (error) {
      snackbar === null || snackbar === void 0 || snackbar.showError('An error occured, please try after some time.');
    }
  };
  const clearError = () => {
    setErrorMessage(null);
    setIsDeleting(false);
  };
  if (isLoading) {
    return /*#__PURE__*/_react.default.createElement(_material.Box, {
      sx: {
        display: 'flex',
        pt: '20%',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/_react.default.createElement(_CircularProgress.default, null));
  }
  const handleChange = function handleChange(e) {
    const {
      name,
      value
    } = e.target;
    const gridData = _objectSpread({}, data);
    gridData[name] = value;
    setData(gridData);
  };
  const actionButtons = [{
    text: 'Reset',
    variant: 'outlined',
    color: 'primary'
  }, {
    text: 'Save',
    variant: 'contained',
    color: 'success'
  }];
  const content = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("form", null, /*#__PURE__*/_react.default.createElement(_Stack.default, {
    direction: "row",
    spacing: 2,
    justifyContent: "flex-end",
    mb: 1
  }, permissions.edit && model.addHeaderFilters !== false && /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "contained",
    type: "submit",
    color: "success",
    onClick: formik.handleSubmit
  }, "Save"), model.addHeaderFilters !== false && /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "contained",
    type: "cancel",
    color: "error",
    onClick: handleFormCancel
  }, "Cancel"), permissions.delete && model.addHeaderFilters !== false && /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "contained",
    color: "error",
    onClick: () => setIsDeleting(true)
  }, "Delete")), /*#__PURE__*/_react.default.createElement(Layout, {
    model: model,
    formik: formik,
    data: data,
    fieldConfigs: fieldConfigs,
    combos: combos,
    onChange: handleChange,
    lookups: lookups,
    id: id
  }), model.addHeaderFilters === false && /*#__PURE__*/_react.default.createElement(_material.Box, {
    bottom: 0,
    right: 0,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  }, actionButtons.map((button, index) => {
    return /*#__PURE__*/_react.default.createElement(_material.Box, {
      key: index,
      ml: 2,
      mt: 4
    }, /*#__PURE__*/_react.default.createElement(model.CustomButton, {
      buttonFunction: button.text === 'Save' ? () => formik.handleSubmit() : () => {
        handleDiscardChanges();
      },
      disabled: button.text === 'Save' && (isLoading || !formik.isValid),
      buttonText: button.text,
      variant: button.variant,
      color: button.color
    }));
  }))), errorMessage && /*#__PURE__*/_react.default.createElement(_Dialog.DialogComponent, {
    open: !!errorMessage,
    onConfirm: clearError,
    onCancel: clearError,
    title: "Info",
    hideCancelButton: true
  }, " ", errorMessage), /*#__PURE__*/_react.default.createElement(_Dialog.DialogComponent, {
    open: isDiscardDialogOpen,
    onConfirm: handleDiscardChangesCloseDialog,
    onCancel: () => setIsDiscardDialogOpen(false),
    title: "Changes not saved",
    okText: "Discard",
    cancelText: "Continue"
  }, "Would you like to continue to edit or discard changes?"), /*#__PURE__*/_react.default.createElement(_Dialog.DialogComponent, {
    open: isDeleting,
    onConfirm: handleDelete,
    onCancel: () => setIsDeleting(false),
    title: "Confirm Delete"
  }, "Are you sure you want to delete ".concat(data === null || data === void 0 ? void 0 : data.GroupName, "?")));
  return !!model.addHeaderFilters ? /*#__PURE__*/_react.default.createElement(ActiveStepContext.Provider, {
    value: {
      activeStep,
      setActiveStep
    }
  }, /*#__PURE__*/_react.default.createElement(_Paper.default, {
    sx: {
      padding: 2
    }
  }, /*#__PURE__*/_react.default.createElement("form", null, /*#__PURE__*/_react.default.createElement(_Stack.default, {
    direction: "row",
    spacing: 2,
    justifyContent: "flex-end",
    mb: 1
  }, permissions.edit && /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "contained",
    type: "submit",
    disabled: isLoading || formik.isValid,
    color: "success",
    onClick: formik.handleSubmit
  }, "Save"), /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "contained",
    type: "cancel",
    color: "error",
    onClick: e => handleFormCancel(e)
  }, "Cancel"), permissions.delete && /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "contained",
    color: "error",
    onClick: () => setIsDeleting(true)
  }, "Delete")), /*#__PURE__*/_react.default.createElement(Layout, {
    model: model,
    formik: formik,
    data: data,
    fieldConfigs: fieldConfigs,
    combos: combos,
    onChange: handleChange,
    lookups: lookups,
    id: id
  })), /*#__PURE__*/_react.default.createElement(_Dialog.DialogComponent, {
    open: isDeleting,
    onConfirm: handleDelete,
    onCancel: () => setIsDeleting(false),
    title: "Confirm Delete"
  }, "Are you sure you want to delete ".concat(data === null || data === void 0 ? void 0 : data.GroupName, "?")))) : content;
};
var _default = exports.default = Form;