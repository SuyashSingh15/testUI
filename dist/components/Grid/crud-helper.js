"use strict";

require("core-js/modules/es.error.cause.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveRecord = exports.getRecord = exports.getList = exports.deleteRecord = void 0;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.json.stringify.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.url-search-params.js");
require("core-js/modules/web.url-search-params.delete.js");
require("core-js/modules/web.url-search-params.has.js");
require("core-js/modules/web.url-search-params.size.js");
var _httpRequest = require("./httpRequest");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const dateDataTypes = ['date', 'dateTime'];
const getList = async _ref => {
  var _filterModel$items;
  let {
    gridColumns,
    setIsLoading,
    setData,
    page,
    pageSize,
    sortModel,
    filterModel,
    api,
    parentFilters,
    action = 'list',
    setError,
    extraParams,
    contentType,
    columns,
    controllerType = 'node',
    type
  } = _ref;
  if (!contentType) {
    setIsLoading(true);
  }
  const lookups = [];
  const dateColumns = [];
  gridColumns.forEach(_ref2 => {
    let {
      lookup,
      type,
      field
    } = _ref2;
    if (dateDataTypes.includes(type)) {
      dateColumns.push(field);
    }
    if (!lookup) {
      return;
    }
    if (!lookups.includes(lookup)) {
      lookups.push(lookup);
    }
  });
  const where = [];
  if (filterModel !== null && filterModel !== void 0 && (_filterModel$items = filterModel.items) !== null && _filterModel$items !== void 0 && _filterModel$items.length) {
    filterModel.items.forEach(filter => {
      if (["isEmpty", "isNotEmpty"].includes(filter.operator) || filter.value !== null && filter.value !== undefined) {
        var _column$;
        const column = gridColumns.filter(item => item.field === filter.field);
        let value = filter.value === 'true' ? 1 : filter.value === 'false' ? 0 : filter.value;
        where.push({
          field: filter.field,
          operator: filter.operator,
          value: value,
          type: (_column$ = column[0]) === null || _column$ === void 0 ? void 0 : _column$.type
        });
      }
    });
  }
  if (parentFilters) {
    where.push(...parentFilters);
  }
  const requestData = _objectSpread(_objectSpread({
    start: page * pageSize,
    limit: pageSize
  }, extraParams), {}, {
    sort: sortModel.map(sort => sort.field + ' ' + sort.sort).join(','),
    where
  });
  if (lookups) {
    requestData.lookups = lookups.join(',');
  }
  const headers = {};
  const url = "".concat(api, "/").concat(action);
  if (contentType) {
    const form = document.createElement("form");
    requestData.responseType = contentType;
    requestData.columns = columns;
    form.setAttribute("method", "POST");
    form.setAttribute("id", "exportForm");
    form.setAttribute("target", "_blank");
    for (const key in requestData) {
      let v = requestData[key];
      if (v === undefined || v === null) {
        continue;
      } else if (typeof v !== 'string') {
        v = JSON.stringify(v);
      }
      let hiddenTag = document.createElement('input');
      hiddenTag.type = "hidden";
      hiddenTag.name = key;
      hiddenTag.value = v;
      form.append(hiddenTag);
    }
    form.setAttribute('action', url);
    document.body.appendChild(form);
    form.submit();
    setTimeout(() => {
      document.getElementById("exportForm").remove();
    }, 3000);
    return;
  }
  try {
    const response = await (0, _httpRequest.transport)({
      url,
      method: 'POST',
      data: requestData,
      headers: _objectSpread({
        "Content-Type": "application/json"
      }, headers)
    });
    if (response.status === _httpRequest.HTTP_STATUS_CODES.OK) {
      const {
        records
      } = response.data;
      if (records) {
        records.forEach(record => {
          dateColumns.forEach(column => {
            if (record[column]) {
              record[column] = new Date(record[column]);
            }
          });
        });
      }
      setData(response.data);
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log(err);
  } finally {
    if (!contentType) {
      setIsLoading(false);
    }
  }
};
exports.getList = getList;
const getRecord = async _ref3 => {
  let {
    api,
    id,
    setIsLoading,
    setActiveRecord,
    modelConfig,
    parentFilters,
    where = {},
    setError
  } = _ref3;
  api = api || (modelConfig === null || modelConfig === void 0 ? void 0 : modelConfig.api);
  setIsLoading(true);
  const searchParams = new URLSearchParams();
  const url = "".concat(api, "/").concat(id === undefined || id === null ? '-' : id);
  const lookupsToFetch = [];
  const fields = modelConfig.formDef || modelConfig.columns;
  fields === null || fields === void 0 || fields.forEach(field => {
    if (field.lookup && !lookupsToFetch.includes(field.lookup)) {
      lookupsToFetch.push(field.lookup);
    }
  });
  searchParams.set("lookups", lookupsToFetch);
  if (where && Object.keys(where).length) {
    searchParams.set("where", JSON.stringify(where));
  }
  ;
  try {
    const response = await (0, _httpRequest.transport)({
      url: "".concat(url, "?").concat(searchParams.toString()),
      method: 'GET',
      credentials: 'include'
    });
    if (response.status === _httpRequest.HTTP_STATUS_CODES.OK) {
      const {
        data: record,
        lookups
      } = response.data;
      let title = record[modelConfig.linkColumn];
      const columnConfig = modelConfig.columns.find(a => a.field === modelConfig.linkColumn);
      if (columnConfig && columnConfig.lookup) {
        if (lookups && lookups[columnConfig.lookup] && lookups[columnConfig.lookup].length) {
          const lookupValue = lookups[columnConfig.lookup].find(a => a.value === title);
          if (lookupValue) {
            title = lookupValue.label;
          }
        }
      }
      const defaultValues = _objectSpread({}, modelConfig.defaultValues);
      setActiveRecord({
        id,
        title: title,
        record: _objectSpread(_objectSpread(_objectSpread({}, defaultValues), record), parentFilters),
        lookups
      });
    } else {
      setError('Could not load record', response.body.toString());
    }
  } catch (error) {
    setError('Could not load record', error);
  } finally {
    setIsLoading(false);
  }
};
exports.getRecord = getRecord;
const deleteRecord = exports.deleteRecord = async function deleteRecord(_ref4) {
  let {
    id,
    api,
    setIsLoading,
    setError
  } = _ref4;
  if (!id) {
    setError('Deleted failed. No active record.');
    return;
  }
  setIsLoading(true);
  try {
    const response = await (0, _httpRequest.transport)({
      url: "".concat(api, "/").concat(id),
      method: 'DELETE'
    });
    if (response.status === _httpRequest.HTTP_STATUS_CODES.OK) {
      return true;
    }
  } catch (error) {
    setError('Deleted failed', error);
  } finally {
    setIsLoading(false);
  }
};
const saveRecord = exports.saveRecord = async function saveRecord(_ref5) {
  let {
    id,
    api,
    values,
    setIsLoading,
    setError
  } = _ref5;
  let url, method;
  if (id !== 0) {
    url = "".concat(api, "/").concat(id);
    method = 'PUT';
  } else {
    url = api;
    method = 'POST';
  }
  try {
    setIsLoading(true);
    const response = await (0, _httpRequest.transport)({
      url,
      method,
      data: values,
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    if (response.status === _httpRequest.HTTP_STATUS_CODES.OK) {
      const {
        data = {}
      } = response.data;
      if (data.success) {
        return data;
      }
      setError('Save failed', data.err || data.message);
      return;
    }
    if (response.status === _httpRequest.HTTP_STATUS_CODES.UNAUTHORIZED) {
      setError('Session Expired!');
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } else {
      setError('Save failed', response.body);
    }
  } catch (error) {
    setError('Save failed', error.response.data.error);
  } finally {
    setIsLoading(false);
  }
  return false;
};