import { transport, HTTP_STATUS_CODES } from "./httpRequest";
const dateDataTypes = ['date', 'dateTime'];
const getList = async ({ gridColumns, setIsLoading, setData, page, pageSize, sortModel, filterModel, api, parentFilters, action = 'list', setError, extraParams, contentType, columns, controllerType = 'node', type }) => {
    if (!contentType) {
        setIsLoading(true);
    }
    const lookups = [];
    const dateColumns = [];
    gridColumns.forEach(({ lookup, type, field }) => {
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
    if (filterModel?.items?.length) {
        filterModel.items.forEach(filter => {
            if (["isEmpty", "isNotEmpty"].includes(filter.operator) || (filter.value !== null && filter.value !== undefined)) {
                const column = gridColumns.filter((item) => item.field === filter.field);
                let value = filter.value === 'true' ? 1 : filter.value === 'false' ? 0 : filter.value;
                where.push({
                    field: filter.field,
                    operator: filter.operator,
                    value: value,
                    type: column[0]?.type
                });
            }
        });
    }
    if (parentFilters) {
        where.push(...parentFilters);
    }

    const requestData = {
        start: page * pageSize,
        limit: pageSize,
        ...extraParams,
        sort: sortModel.map(sort => sort.field + ' ' + sort.sort).join(','),
        where
    };

    if (lookups) {
        requestData.lookups = lookups.join(',');
    }

    const headers = {};
    const url = `${api}/${action}`;
    if (contentType) {
        const form = document.createElement("form");
        requestData.responseType = contentType;
        requestData.columns = columns;
        form.setAttribute("method", "POST");
        form.setAttribute("id", "exportForm");
        form.setAttribute("target", "_blank")
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
        }, 3000)
        return;
    }
    try {
        const response = await transport({
            url,
            method: 'POST',
            data: requestData,
            headers: {
                "Content-Type": "application/json",
                ...headers
            },
        });
        if (response.status === HTTP_STATUS_CODES.OK) {
            const { records } = response.data;
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

const getRecord = async ({ api, id, setIsLoading, setActiveRecord, modelConfig, parentFilters, where = {}, setError }) => {
    api = api || modelConfig?.api
    setIsLoading(true);
    const searchParams = new URLSearchParams();
    const url = `${api}/${id === undefined || id === null ? '-' : id}`;
    const lookupsToFetch = [];
    const fields = modelConfig.formDef || modelConfig.columns;
    fields?.forEach(field => {
        if (field.lookup && !lookupsToFetch.includes(field.lookup)) {
            lookupsToFetch.push(field.lookup);
        }
    });
    searchParams.set("lookups", lookupsToFetch);
    if (where && Object.keys(where).length) {
        searchParams.set("where", JSON.stringify(where));
    };
    try {
        const response = await transport({
            url: `${url}?${searchParams.toString()}`,
            method: 'GET',
            credentials: 'include'
        });
        if (response.status === HTTP_STATUS_CODES.OK) {
            const { data: record, lookups } = response.data;
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

            const defaultValues = { ...modelConfig.defaultValues };

            setActiveRecord({ id, title: title, record: { ...defaultValues, ...record, ...parentFilters }, lookups });
        } else {
            setError('Could not load record', response.body.toString());
        }
    } catch (error) {
        setError('Could not load record', error);
    } finally {
        setIsLoading(false);
    }
};

const deleteRecord = async function ({ id, api, setIsLoading, setError }) {
    if (!id) {
        setError('Deleted failed. No active record.');
        return;
    }
    setIsLoading(true);
    try {
        const response = await transport({
            url: `${api}/${id}`,
            method: 'DELETE',
        });
        if (response.status === HTTP_STATUS_CODES.OK) {
            return true;
        }
    } catch (error) {
        setError('Deleted failed', error);
    } finally {
        setIsLoading(false);
    }
};

const saveRecord = async function ({ id, api, values, setIsLoading, setError }) {
    let url, method;
    if (id !== 0) {
        url = `${api}/${id}`;
        method = 'PUT';
    } else {
        url = api;
        method = 'POST';
    }
    try {
        setIsLoading(true);
        const response = await transport({
            url,
            method,
            data: values,
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        if (response.status === HTTP_STATUS_CODES.OK) {
            const { data = {} } = response.data;
            if (data.success) {
                return data;
            }
            setError('Save failed', data.err || data.message);
            return;
        }
        if (response.status === HTTP_STATUS_CODES.UNAUTHORIZED) {
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

export {
    getList,
    getRecord,
    deleteRecord,
    saveRecord,
};
