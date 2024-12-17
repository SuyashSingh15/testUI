"use strict";

require("core-js/modules/es.error.cause.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transport = exports.default = exports.HTTP_STATUS_CODES = void 0;
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.json.stringify.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.url.js");
require("core-js/modules/web.url.to-json.js");
require("core-js/modules/web.url-search-params.js");
require("core-js/modules/web.url-search-params.delete.js");
require("core-js/modules/web.url-search-params.has.js");
require("core-js/modules/web.url-search-params.size.js");
var _react = _interopRequireDefault(require("react"));
var _axios = _interopRequireDefault(require("axios"));
var _index = require("../SnackBar/index");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
let pendingRequests = 0;
const transport = exports.transport = _axios.default.create({
  withCredentials: true
});
const HTTP_STATUS_CODES = exports.HTTP_STATUS_CODES = {
  OK: 200,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};
const getFormData = props => {
  let formData = new FormData();
  for (let key in props) {
    if (typeof props[key] == "object") {
      formData.append(key, JSON.stringify(props[key]));
    } else {
      formData.append(key, props[key]);
    }
  }
  return formData;
};
const exportRequest = (url, query) => {
  const newURL = new URL(url);
  for (let key in query) {
    const value = typeof query[key] === 'object' ? JSON.stringify(query[key]) : query[key];
    newURL.searchParams.append(key, value);
  }
  window.open(newURL, '_blank').focus();
};
const request = async _ref => {
  let {
    url,
    params = {},
    history,
    jsonPayload = false,
    additionalParams = {},
    additionalHeaders = {},
    disableLoader = false
  } = _ref;
  const snackbar = (0, _index.useSnackbar)();
  if (params.exportData) {
    return exportRequest(url, params);
  }
  pendingRequests++;
  let reqParams = _objectSpread({
    method: 'POST',
    credentials: 'include',
    url: url,
    headers: jsonPayload ? _objectSpread({}, additionalHeaders) : _objectSpread({
      'Content-Type': 'multipart/form-data'
    }, additionalHeaders)
  }, additionalParams);
  if (params) {
    reqParams.data = jsonPayload ? params : getFormData(params);
  }
  try {
    let response = await transport(reqParams);
    pendingRequests--;
    let data = response.data;
    if (response) {
      if (response.status === 200) {
        let json = response.data;
        if (json.success === false) {
          if (json.info === 'Session has expired!') {
            snackbar.showError('error: Your session has expired. Please login again.');
            history.push('/login');
            return;
          } else if (response.status === 200) {
            return data;
          }
        } else {
          return data;
        }
      }
    } else {
      return data;
    }
  } catch (ex) {
    var _ex$response, _ex$response2;
    pendingRequests--;
    if ((ex === null || ex === void 0 || (_ex$response = ex.response) === null || _ex$response === void 0 ? void 0 : _ex$response.status) === 401) {
      snackbar.showError('error: You are not authorized to access this page');
      history.push('/login');
    } else if ((ex === null || ex === void 0 || (_ex$response2 = ex.response) === null || _ex$response2 === void 0 ? void 0 : _ex$response2.status) === 500) {
      var _ex$response3;
      snackbar.showError("error: ".concat(ex === null || ex === void 0 || (_ex$response3 = ex.response) === null || _ex$response3 === void 0 || (_ex$response3 = _ex$response3.data) === null || _ex$response3 === void 0 ? void 0 : _ex$response3.info));
    } else {
      console.error(ex);
      return {
        error: ex.response
      };
    }
  }
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
};
var _default = exports.default = request;